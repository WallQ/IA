import re
import string

import joblib
import matplotlib.pyplot as plt
import nltk
import pandas as pd
import seaborn as sns
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.model_selection import train_test_split, cross_val_score
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


def evaluate_model(clf, x_test, y_test):
    y_pred = clf.predict(x_test)
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    return accuracy, precision, recall, f1, y_pred


def cross_validate_model(clf, x_train, y_train, cv=5):
    scores = cross_val_score(clf, x_train, y_train, cv=cv, scoring='accuracy')
    print(f"Cross-validation scores: {scores}")
    print(f"Mean cross-validation score: {scores.mean()}")
    return scores.mean()


def plot_metrics(metrics_dict):
    df_metrics = pd.DataFrame(metrics_dict)
    df_metrics_melted = df_metrics.melt(id_vars='Model', var_name='Metric', value_name='Value')
    plt.figure(figsize=(12, 8))
    sns.barplot(data=df_metrics_melted, x='Metric', y='Value', hue='Model')
    plt.title('Performance Metrics of Different Models')
    plt.xlabel('Metric')
    plt.ylabel('Score')
    plt.ylim(0, 1)
    plt.legend(loc='upper right')
    plt.show()


def plot_confusion_matrix(cm, model_name):
    plt.figure(figsize=(6, 4))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=False)
    plt.title(f'Confusion Matrix for {model_name}')
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.show()


def plot_learning_curve(train_sizes, train_scores, val_scores, model_name):
    plt.figure(figsize=(10, 6))
    plt.plot(train_sizes, train_scores, label='Training Score')
    plt.plot(train_sizes, val_scores, label='Validation Score')
    plt.title(f'Learning Curve for {model_name}')
    plt.xlabel('Training Size')
    plt.ylabel('Score')
    plt.legend(loc='best')
    plt.show()


def save_model(clf, vectorizer, model_name):
    joblib.dump(clf, f'{model_name}_model.joblib')
    joblib.dump(vectorizer, f'{model_name}_vectorizer.joblib')


def main():
    df = pd.read_csv('dataset.csv', encoding='utf8')

    transformed_df = transform_data(df)
    corpus = text_preprocessing(transformed_df)

    vectorizer = TfidfVectorizer(max_features=10000, min_df=5, max_df=0.7)
    x = vectorizer.fit_transform(corpus)
    y = transformed_df.spam

    # Split the data into 60% training, 20% validation, and 20% testing
    X_train, X_temp, y_train, y_temp = train_test_split(x, y, test_size=0.4, random_state=42)
    X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)

    models = {
        'Random Forest': RandomForestClassifier(n_estimators=100, max_depth=10, min_samples_split=10, min_samples_leaf=4, random_state=42, n_jobs=-1),
        'SVM': SVC(C=0.1, kernel='linear', random_state=42),
        'Logistic Regression': LogisticRegression(penalty='l2', C=0.1, max_iter=1000, random_state=42, n_jobs=-1)
    }

    metrics_dict = {'Model': [], 'Accuracy': [], 'Precision': [], 'Recall': [], 'F1 Score': []}
    learning_curves = {'Random Forest': {}, 'SVM': {}, 'Logistic Regression': {}}

    train_sizes = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]

    for model_name, model in models.items():
        train_scores = []
        val_scores = []

        for train_size in train_sizes:
            X_train_subset, _, y_train_subset, _ = train_test_split(X_train, y_train, train_size=train_size,
                                                                    random_state=42)
            model.fit(X_train_subset, y_train_subset)

            train_accuracy, _, _, _, _ = evaluate_model(model, X_train_subset, y_train_subset)
            val_accuracy, _, _, _, _ = evaluate_model(model, X_val, y_val)

            train_scores.append(train_accuracy)
            val_scores.append(val_accuracy)

        learning_curves[model_name]['train_scores'] = train_scores
        learning_curves[model_name]['val_scores'] = val_scores

        plot_learning_curve(train_sizes, train_scores, val_scores, model_name)

        model.fit(X_train, y_train)
        accuracy, precision, recall, f1, y_pred = evaluate_model(model, X_test, y_test)
        save_model(model, vectorizer, model_name.lower().replace(' ', '_'))
        print(
            f"{model_name} - Accuracy: {accuracy:.4f}, Precision: {precision:.4f}, Recall: {recall:.4f}, F1 Score: {f1:.4f}")

        metrics_dict['Model'].append(model_name)
        metrics_dict['Accuracy'].append(accuracy)
        metrics_dict['Precision'].append(precision)
        metrics_dict['Recall'].append(recall)
        metrics_dict['F1 Score'].append(f1)

        cm = confusion_matrix(y_test, y_pred)
        plot_confusion_matrix(cm, model_name)

        cv_score = cross_validate_model(model, X_train, y_train, cv=5)
        print(f"{model_name} - Cross-validation Score: {cv_score:.4f}")

    plot_metrics(metrics_dict)


if __name__ == '__main__':
    main()
