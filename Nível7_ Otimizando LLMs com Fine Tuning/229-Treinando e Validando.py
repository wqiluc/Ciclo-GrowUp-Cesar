# Rodar no Google Colab com GPU (após o upload da aula 227)
# !pip install -q transformers datasets evaluate accelerate scikit-learn
import json

import evaluate
import numpy as np
from datasets import Dataset, DatasetDict
from sklearn.metrics import classification_report
from transformers import (
    AutoModelForSequenceClassification,
    AutoTokenizer,
    DataCollatorWithPadding,
    Trainer,
    TrainingArguments,
)

MODEL_BASE = "google-bert/bert-base-uncased"  # ou "neuralmind/bert-base-portuguese-cased" (BERTimbau)
OUTPUT_DIR = "bert-hate-speech-pt"

label2id = {"no-hate": 0, "hate": 1}
id2label = {v: k for k, v in label2id.items()}


def load_split(path: str) -> Dataset:
    with open(path, encoding="utf-8") as f:
        rows = [json.loads(line)["messages"] for line in f]
    return Dataset.from_list([{"text": m[1]["content"], "label": label2id[m[2]["content"]]} for m in rows])


dataset = DatasetDict({"train": load_split("train.jsonl"), "test": load_split("test.jsonl")})

tokenizer = AutoTokenizer.from_pretrained(MODEL_BASE)
tokenized = dataset.map(lambda b: tokenizer(b["text"], truncation=True, max_length=128), batched=True)

model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_BASE, num_labels=2, id2label=id2label, label2id=label2id
)

accuracy = evaluate.load("accuracy")
f1 = evaluate.load("f1")


def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
    return {
        **accuracy.compute(predictions=preds, references=labels),
        **f1.compute(predictions=preds, references=labels),  # F1 da classe hate
    }


args = TrainingArguments(
    output_dir=OUTPUT_DIR,
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=2,
    weight_decay=0.01,
    eval_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    report_to="none",
)

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized["train"],
    eval_dataset=tokenized["test"],
    processing_class=tokenizer,
    data_collator=DataCollatorWithPadding(tokenizer),  # padding dinâmico por batch
    compute_metrics=compute_metrics,
)

trainer.train()
print(trainer.evaluate())

preds = np.argmax(trainer.predict(tokenized["test"]).predictions, axis=-1)
print(classification_report(tokenized["test"]["label"], preds, target_names=["no-hate", "hate"]))

trainer.save_model(OUTPUT_DIR)  # usado na aula 230
