import re
import string
import joblib
import nltk
import pandas as pd
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

nltk.download('stopwords')


def transform_data(dataframe):
    dataframe.drop(columns={'receiver', 'date', 'subject', 'urls'}, inplace=True)
    dataframe.dropna(subset=['sender', 'body', 'label'], inplace=True)
    dataframe.drop_duplicates(inplace=True)
    dataframe['sender'] = dataframe['sender'].apply(
        lambda text: re.search(r'<([^>]+)>', text).group(1) if re.search(r'<([^>]+)>', text) else None)
    dataframe['body'] = dataframe['body'].apply(lambda x: x.replace('\n', ''))
    dataframe.rename(columns={"sender": "email", "body": "message", "label": "spam"}, inplace=True)
    return dataframe


def text_preprocessing(dataframe):
    stemmer = PorterStemmer()
    stopwords_set = set(stopwords.words('english'))
    corpus = []
    for i in range(len(dataframe)):
        text = dataframe['message'].iloc[i].lower()
        text = text.translate(str.maketrans('', '', string.punctuation)).split()
        text = [stemmer.stem(word) for word in text if word not in stopwords_set]
        text = ' '.join(text)
        corpus.append(text)
    return corpus


def save_model(clf, vectorizer, model_name):
    joblib.dump(clf, f'{model_name}_model.joblib')
    joblib.dump(vectorizer, f'{model_name}_vectorizer.joblib')


def evaluate_model(clf, X_test, y_test):
    y_pred = clf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    return accuracy, precision, recall, f1


def main():
    df = pd.read_csv('dataset.csv', encoding='utf8')

    transformed_df = transform_data(df)
    corpus = text_preprocessing(transformed_df)

    vectorizer = TfidfVectorizer(max_features=10000, min_df=5, max_df=0.7)
    x = vectorizer.fit_transform(corpus)
    y = transformed_df.spam

    X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

    # Random Forest Classifier
    rf_clf = RandomForestClassifier(n_jobs=-1, random_state=42)
    rf_clf.fit(X_train, y_train)
    rf_metrics = evaluate_model(rf_clf, X_test, y_test)
    save_model(rf_clf, vectorizer, 'random_forest')
    print("Random Forest Classifier - Accuracy: {:.4f}, Precision: {:.4f}, Recall: {:.4f}, F1 Score: {:.4f}".format(*rf_metrics))

    # Support Vector Machine
    svm_clf = SVC(random_state=42)
    svm_clf.fit(X_train, y_train)
    svm_metrics = evaluate_model(svm_clf, X_test, y_test)
    save_model(svm_clf, vectorizer, 'svm')
    print("Support Vector Machine - Accuracy: {:.4f}, Precision: {:.4f}, Recall: {:.4f}, F1 Score: {:.4f}".format(*svm_metrics))

    # Logistic Regression
    lr_clf = LogisticRegression(max_iter=1000, random_state=42)
    lr_clf.fit(X_train, y_train)
    lr_metrics = evaluate_model(lr_clf, X_test, y_test)
    save_model(lr_clf, vectorizer, 'logistic_regression')
    print("Logistic Regression - Accuracy: {:.4f}, Precision: {:.4f}, Recall: {:.4f}, F1 Score: {:.4f}".format(*lr_metrics))

if __name__ == '__main__':
    main()
