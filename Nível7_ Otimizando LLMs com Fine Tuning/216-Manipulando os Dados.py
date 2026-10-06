# pip install datasets pandas scikit-learn
import json

from datasets import load_dataset
from sklearn.model_selection import train_test_split

DATASET = "hate-speech-portuguese/hate_speech_portuguese"

SYSTEM_PROMPT = (
    "Você é um classificador de discurso de ódio em tweets em português. "
    "Responda apenas com 'hate' ou 'no-hate'."
)

dataset = load_dataset(DATASET, revision="refs/convert/parquet")
df = dataset["train"].to_pandas()[["text", "label"]]
df["label"] = df["label"].map({0: "no-hate", 1: "hate"})

# Quebras de linha e espaços repetidos só gastam tokens
df["text"] = df["text"].str.split().str.join(" ")

train_df, test_df = train_test_split(df, test_size=0.2, stratify=df["label"], random_state=42)


def to_messages(text: str, label: str) -> dict:
    return {
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": text},
            {"role": "assistant", "content": label},
        ]
    }


train_data = [to_messages(row.text, row.label) for row in train_df.itertuples()]
test_data = [to_messages(row.text, row.label) for row in test_df.itertuples()]

print(len(train_data), len(test_data))
print(json.dumps(train_data[0], ensure_ascii=False, indent=2))
