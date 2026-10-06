<h1 align="center">🧹 Preparando Dataset</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_7-Otimizando_LLMs_com_Fine_Tuning-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Fine_Tuning-Preparando_Dataset-111827?style=flat-square&logo=huggingface&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Converter os JSONL (formato `messages`) para o formato do BERT, **`text` + `label` numérico**, e **tokenizar** os textos.

---

## 🔄 De `messages` para `text` / `label`

O BERT não usa prompt de sistema nem resposta em texto: ele recebe o **texto** e prevê um **id de classe**.

```python
import json
from datasets import Dataset, DatasetDict

label2id = {"no-hate": 0, "hate": 1}
id2label = {v: k for k, v in label2id.items()}


def load_split(path: str) -> Dataset:
    with open(path, encoding="utf-8") as f:
        rows = [json.loads(line)["messages"] for line in f]
    return Dataset.from_list([{"text": m[1]["content"], "label": label2id[m[2]["content"]]} for m in rows])


dataset = DatasetDict({"train": load_split("train.jsonl"), "test": load_split("test.jsonl")})
```

| `messages` (OpenAI) | BERT |
| :--- | :--- |
| `system` | ❌ descartado |
| `user` | `text` |
| `assistant` (`"hate"` / `"no-hate"`) | `label` (`1` / `0`) |

```
DatasetDict({
    train: Dataset({features: ['text', 'label'], num_rows: 4536})
    test:  Dataset({features: ['text', 'label'], num_rows: 1134})
})
```

---

## ✂️ Tokenização

```python
from transformers import AutoTokenizer

MODEL_BASE = "google-bert/bert-base-uncased"  # ou "neuralmind/bert-base-portuguese-cased" (BERTimbau)
tokenizer = AutoTokenizer.from_pretrained(MODEL_BASE)


def tokenize(batch):
    return tokenizer(batch["text"], truncation=True, max_length=128)


tokenized = dataset.map(tokenize, batched=True)
```

| Parâmetro | Por quê |
| :--- | :--- |
| `truncation=True` | Corta textos maiores que o limite |
| `max_length=128` | Tweets são curtos; limite menor = treino mais rápido (BERT aceita até 512) |
| `batched=True` | Tokeniza vários exemplos de uma vez (bem mais rápido) |

O tokenizer adiciona as colunas que o modelo consome:

| Coluna | Conteúdo |
| :--- | :--- |
| `input_ids` | Ids dos tokens, com `[CLS]` no início e `[SEP]` no fim |
| `attention_mask` | `1` para token real, `0` para padding |
| `token_type_ids` | Separa sentença A/B (aqui tudo `0`) |

```python
tokenizer.convert_ids_to_tokens(tokenized["train"][0]["input_ids"])[:8]
# ['[CLS]', 'to', 'me', 'ac', '##hando', ...]  (a divisão exata depende do vocabulário)
```

> O `bert-base-uncased` (do curso) foi treinado em **inglês**: palavras em português viram vários sub-tokens. O **BERTimbau** costuma dar resultado melhor em PT-BR; basta trocar `MODEL_BASE`.

---

## ✅ Resumo

- `messages` → `text` + `label` (0/1), com `label2id` / `id2label` para manter os nomes.
- `AutoTokenizer` do mesmo modelo base que vai ser treinado.
- `dataset.map(tokenize, batched=True)` gera `input_ids` e `attention_mask`.
- **Padding** fica para o treino (aula 229), feito por batch.
