<h1 align="center">📥 Importando Dataset</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_7-Otimizando_LLMs_com_Fine_Tuning-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Fine_Tuning-Importando_Dataset-111827?style=flat-square&logo=huggingface&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Baixar o dataset **`hate-speech-portuguese/hate_speech_portuguese`** do Hugging Face com a biblioteca `datasets` e convertê-lo para um **DataFrame** do pandas, mantendo só o que interessa para o fine-tuning.

---

## 📦 Instalação

```bash
pip install datasets pandas
```

---

## 🤗 Carregando do Hugging Face

```python
from datasets import load_dataset

DATASET = "hate-speech-portuguese/hate_speech_portuguese"

dataset = load_dataset(DATASET, revision="refs/convert/parquet")
print(dataset)
```

```
DatasetDict({
    train: Dataset({
        features: ['text', 'label', 'hatespeech_G1', 'annotator_G1', 'hatespeech_G2', 'annotator_G2', 'hatespeech_G3', 'annotator_G3'],
        num_rows: 5670
    })
})
```

> ⚠️ Esse dataset usa um **script de loading** (`hate_speech_portuguese.py`), que versões recentes do `datasets` não executam mais (`RuntimeError: Dataset scripts are no longer supported`). A branch **`refs/convert/parquet`** é a cópia em Parquet que o próprio Hub gera — mesmo conteúdo, sem script.

| Retorno | Significado |
| :--- | :--- |
| `DatasetDict` | Dicionário de splits |
| `train` | Único split disponível (não há `test`/`validation`) |
| `num_rows` | 5.670 tweets |

---

## 🐼 Convertendo para pandas

```python
df = dataset["train"].to_pandas()
print(df.shape)              # (5670, 8)
print(df.columns.tolist())
```

| Coluna | Conteúdo |
| :--- | :--- |
| `text` | O tweet |
| `label` | Rótulo final: `0` = no-hate, `1` = hate |
| `hatespeech_G*` / `annotator_G*` | Anotações individuais de cada grupo de anotadores |

---

## 🧹 Mantendo só texto e rótulo

```python
df = df[["text", "label"]]
df["label"] = df["label"].map({0: "no-hate", 1: "hate"})

print(df.head())
print(df["label"].value_counts())
```

```
                                                text    label
0  @__andrea__b \nO cara vive em outro mundo\nNão...     hate
1  @_carmeloneto Estes incompetentes não cuidam n...  no-hate
2  @_carmeloneto \nOs 'cumpanhero' quebraram toda...  no-hate
3  @_GlitteryKisses é isso não conseguem pensar n...  no-hate
4                @_iglira bom dia macaco branco haha     hate

label
no-hate    3882
hate       1788
```

> Os rótulos viram **texto** porque, no formato chat da OpenAI, a resposta do `assistant` é uma string — o modelo vai aprender a responder `hate` ou `no-hate`.

---

## ⚖️ Distribuição das classes

| Classe | Qtd. | % |
| :--- | :---: | :---: |
| `no-hate` | 3.882 | ~68% |
| `hate` | 1.788 | ~32% |

O dataset é **desbalanceado**: um modelo que sempre respondesse `no-hate` já acertaria ~68%. Isso importa na hora de separar treino/validação e de avaliar o modelo.

---

## ✅ Resumo

- `load_dataset` baixa datasets do Hugging Face como `DatasetDict`.
- Datasets antigos baseados em script carregam via `revision="refs/convert/parquet"`.
- `.to_pandas()` transforma o split em DataFrame.
- Ficamos só com `text` e `label` (como string), prontos para virar **JSONL** no formato `messages`.
