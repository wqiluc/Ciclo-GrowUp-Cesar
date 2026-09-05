from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

dados = load_iris()
X_treino, X_teste, y_treino, y_teste = train_test_split(
    dados.data, dados.target, test_size=0.2, random_state=42
)

modelo = DecisionTreeClassifier()
modelo.fit(X_treino, y_treino)

previsoes = modelo.predict(X_teste)
print(f"Acurácia: {accuracy_score(y_teste, previsoes):.2%}")
