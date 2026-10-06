# Rodar no Google Colab (após o upload da aula 227)
# !pip install -q transformers datasets
import json

from datasets import Dataset, DatasetDict
from transformers import AutoTokenizer

MODEL_BASE = "google-bert/bert-base-uncased"  # ou "neuralmind/bert-base-portuguese-cased" (BERTimbau)

label2id = {"no-hate": 0, "hate": 1}
id2label = {v: k for k, v in label2id.items()}


def load_split(path: str) -> Dataset:
    # messages = [system, user, assistant] → só o texto do user e o label do assistant
    with open(path, encoding="utf-8") as f:
        rows = [json.loads(line)["messages"] for line in f]
    return Dataset.from_list([{"text": m[1]["content"], "label": label2id[m[2]["content"]]} for m in rows])


dataset = DatasetDict({"train": load_split("train.jsonl"), "test": load_split("test.jsonl")})
print(dataset)

tokenizer = AutoTokenizer.from_pretrained(MODEL_BASE)


def tokenize(batch):
    return tokenizer(batch["text"], truncation=True, max_length=128)


tokenized = dataset.map(tokenize, batched=True)
print(tokenized["train"][0]["text"])
print(tokenizer.convert_ids_to_tokens(tokenized["train"][0]["input_ids"]))
