# pip install openai python-dotenv scikit-learn
import json
import random
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI
from sklearn.metrics import accuracy_score, classification_report

load_dotenv()

DATA_DIR = Path(__file__).parent / "data"
BASE_MODEL = "gpt-4o-mini-2024-07-18"
FINE_TUNED_MODEL = (DATA_DIR / "fine_tuned_model.txt").read_text().strip()  # gerado na aula 218
N_AMOSTRAS = 200  # o teste tem 1.134 exemplos; uma amostra reduz custo e tempo

client = OpenAI()

with open(DATA_DIR / "test.jsonl", encoding="utf-8") as f:
    test_data = [json.loads(line) for line in f]

random.seed(42)
amostra = random.sample(test_data, N_AMOSTRAS)


def classificar(model: str, exemplo: dict) -> str:
    # Envia system + user; a resposta do assistant é o que queremos prever
    resposta = client.chat.completions.create(
        model=model,
        messages=exemplo["messages"][:2],
        temperature=0,
        max_tokens=5,
    )
    return resposta.choices[0].message.content.strip().lower()


y_true = [ex["messages"][2]["content"] for ex in amostra]

for model in (BASE_MODEL, FINE_TUNED_MODEL):
    y_pred = [classificar(model, ex) for indice, ex in enumerate(amostra)]
    print(f"\n=== {model}")
    print(f"Acurácia: {accuracy_score(y_true, y_pred):.3f}")
    print(classification_report(y_true, y_pred, labels=["no-hate", "hate"], zero_division=0))

# Teste manual
tweet = "bom dia a todos, ótima semana!"
exemplo = {"messages": [amostra[0]["messages"][0], {"role": "user", "content": tweet}]}
print(tweet, "→", classificar(FINE_TUNED_MODEL, exemplo))
