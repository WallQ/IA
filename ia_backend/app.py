import string

import joblib
import nltk
from flask import Flask, jsonify, request
from flask_cors import CORS
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

nltk.download('stopwords')

app = Flask(__name__)
CORS(app)


def load_models(model_name):
    try:
        if model_name == 'random_forest':
            clf = joblib.load('random_forest_model.joblib')
            vectorizer = joblib.load('random_forest_vectorizer.joblib')
        elif model_name == 'svm':
            clf = joblib.load('svm_model.joblib')
            vectorizer = joblib.load('svm_vectorizer.joblib')
        elif model_name == 'logistic_regression':
            clf = joblib.load('logistic_regression_model.joblib')
            vectorizer = joblib.load('logistic_regression_vectorizer.joblib')
        else:
            clf = joblib.load('random_forest_model.joblib')
            vectorizer = joblib.load('random_forest_vectorizer.joblib')

        return clf, vectorizer
    except Exception as e:
        raise RuntimeError(f"Error loading models: {str(e)}")


def predict_spam(message, clf, vectorizer):
    stemmer = PorterStemmer()
    stopwords_set = set(stopwords.words('english'))
    text = message.lower().translate(str.maketrans('', '', string.punctuation)).split()
    text = [stemmer.stem(word) for word in text if word not in stopwords_set]
    text = ' '.join(text)
    text_corpus = [text]
    x_text = vectorizer.transform(text_corpus)
    prediction = clf.predict(x_text)
    return prediction[0]


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        model = data['model']
        prompt = data['prompt']

        if not model or not prompt:
            return jsonify({'error': 'Invalid input'}), 400

        clf, vectorizer = load_models(model)

        prediction = predict_spam(prompt, clf, vectorizer)

        result = True if prediction == 1 else False

        return jsonify({'spam': result})
    except Exception as e:
        app.logger.error(f"Error during prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
