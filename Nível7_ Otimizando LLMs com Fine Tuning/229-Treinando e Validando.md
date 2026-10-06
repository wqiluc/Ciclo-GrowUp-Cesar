<h1 align="center">🏋️ Treinando e Validando</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_7-Otimizando_LLMs_com_Fine_Tuning-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Fine_Tuning-Treinando_e_Validando-111827?style=flat-square&logo=huggingface&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Fazer o fine-tuning do BERT para classificar **hate / no-hate** com o **`Trainer`** do Hugging Face e medir o resultado no conjunto de teste.

---

## 🧠 Modelo com cabeça de classificação

```python
from transformers import AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_BASE, num_labels=2, id2label=id2label, label2id=label2id
)
```

`AutoModelForSequenceClassification` = BERT pré-treinado + **camada linear** nova em cima do token `[CLS]`. Essa camada começa aleatória (por isso o aviso *"Some weights ... are newly initialized"*) e é aprendida no fine-tuning.

> Passar `id2label` faz o modelo salvo responder `hate` / `no-hate` em vez de `LABEL_0` / `LABEL_1`.

---

## 📏 Métricas

```python
import numpy as np
import evaluate

accuracy = evaluate.load("accuracy")
f1 = evaluate.load("f1")


def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
    return {
        **accuracy.compute(predictions=preds, references=labels),
        **f1.compute(predictions=preds, references=labels),  # F1 da classe hate (1)
    }
```

> O dataset é desbalanceado (~31% `hate`): como nas aulas 219 e 223, o **F1 de `hate`** diz mais que a acurácia.

---

## ⚙️ Configuração do treino

```python
from transformers import DataCollatorWithPadding, Trainer, TrainingArguments

args = TrainingArguments(
    output_dir="bert-hate-speech-pt",
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
```

| Parâmetro | Significado |
| :--- | :--- |
| `learning_rate=2e-5` | Taxa pequena: ajusta o modelo sem "esquecer" o pré-treino |
| `per_device_train_batch_size=16` | Exemplos por passo (cabe bem na T4) |
| `num_train_epochs=2` | Passadas completas pelo dataset de treino |
| `weight_decay=0.01` | Regularização contra overfitting |
| `eval_strategy="epoch"` | Valida no `test` ao fim de cada época |
| `load_best_model_at_end=True` | Mantém o checkpoint com menor `eval_loss` |
| `report_to="none"` | Não pede login no W&B |

---

## 🏋️ Treinando

```python
trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized["train"],
    eval_dataset=tokenized["test"],
    processing_class=tokenizer,
    data_collator=DataCollatorWithPadding(tokenizer),
    compute_metrics=compute_metrics,
)

trainer.train()
```

`DataCollatorWithPadding` completa cada **batch** até o maior texto daquele batch (padding dinâmico), em vez de completar tudo até 128.

A cada época o `Trainer` mostra **Training Loss**, **Validation Loss**, **Accuracy** e **F1**.

> No vídeo, o modelo do instrutor (`bert-base-uncased`) chegou a **loss 0.4858** e **accuracy 0.7544**.

---

## ✔️ Validando

```python
from sklearn.metrics import classification_report

print(trainer.evaluate())

preds = np.argmax(trainer.predict(tokenized["test"]).predictions, axis=-1)
print(classification_report(tokenized["test"]["label"], preds, target_names=["no-hate", "hate"]))
```

Se a **training loss** cai mas a **validation loss** sobe, é **overfitting**: reduzir épocas ou aumentar `weight_decay`.

---

## ✅ Resumo

- `AutoModelForSequenceClassification` = BERT + camada de classificação nova.
- `TrainingArguments` define hiperparâmetros; `Trainer` faz o loop de treino e validação.
- `compute_metrics` com accuracy + **F1** (dataset desbalanceado).
- Em 2 épocas na T4 o modelo do curso chegou a ~75% de acurácia, com só 110M parâmetros.
