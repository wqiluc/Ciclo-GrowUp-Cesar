# pip install datasets pandas scikit-learn
import json
from pathlib import Path

from datasets import load_dataset
from sklearn.model_selection import train_test_split

DATASET = "hate-speech-portuguese/hate_speech_portuguese"
OUTPUT_DIR = Path(__file__).parent / "data"

SYSTEM_PROMPT = (
    "Você é um classificador de discurso de ódio em tweets em português. "
    "Responda apenas com 'hate' ou 'no-hate'."
)

dataset = load_dataset(DATASET, revision="refs/convert/parquet")
df = dataset["train"].to_pandas()[["text", "label"]]
df["label"] = df["label"].map({0: "no-hate", 1: "hate"})
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


def save_jsonl(df, path: Path) -> None:
    with open(path, "w", encoding="utf-8") as f:
        for row in df.itertuples():
            # ensure_ascii=False mantém acentos legíveis; um objeto JSON por linha
            f.write(json.dumps(to_messages(row.text, row.label), ensure_ascii=False) + "\n")


OUTPUT_DIR.mkdir(exist_ok=True)
save_jsonl(train_df, OUTPUT_DIR / "train.jsonl")
save_jsonl(test_df, OUTPUT_DIR / "test.jsonl")

# Conferindo: cada linha precisa ser um JSON válido com system/user/assistant
for name in ("train.jsonl", "test.jsonl"):
    with open(OUTPUT_DIR / name, encoding="utf-8") as f:
        lines = [json.loads(line) for line in f]
    assert all([m["role"] for m in ex["messages"]] == ["system", "user", "assistant"] for ex in lines)
    print(f"{name}: {len(lines)} exemplos OK")
