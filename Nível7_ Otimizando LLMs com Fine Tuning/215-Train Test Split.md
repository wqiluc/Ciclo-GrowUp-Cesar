<h1 align="center">✂️ Train Test Split</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_7-Otimizando_LLMs_com_Fine_Tuning-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Fine_Tuning-Train_Test_Split-111827?style=flat-square&logo=huggingface&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Separar o dataset em **treino** e **teste**: o treino vai para o fine-tuning, e o teste fica guardado para medir o modelo com tweets que ele **nunca viu**.

---

## 📦 Instalação

```bash
pip install datasets pandas scikit-learn
```

---

## 🤔 Por que separar

O dataset do Hugging Face só tem o split **`train`** (aula 214). Se avaliássemos o modelo com os mesmos tweets usados no treino, ele poderia só ter **decorado** as respostas. O conjunto de teste simula dados novos.

---

## ✂️ `train_test_split`

```python
from sklearn.model_selection import train_test_split

train_df, test_df = train_test_split(
    df,
    test_size=0.2,
    stratify=df["label"],
    random_state=42,
)

print(f"Treino: {len(train_df)} | Teste: {len(test_df)}")
```

```
Treino: 4536 | Teste: 1134
```

| Parâmetro | Função |
| :--- | :--- |
| `test_size=0.2` | 20% para teste, 80% para treino |
| `stratify=df["label"]` | Mantém a proporção `hate`/`no-hate` igual nos dois conjuntos |
| `random_state=42` | Fixa o embaralhamento, então o split é sempre o mesmo |

---

## ⚖️ Conferindo a estratificação

```python
print(train_df["label"].value_counts(normalize=True).round(3))
print(test_df["label"].value_counts(normalize=True).round(3))
```

| Classe | Treino | Teste |
| :--- | :---: | :---: |
| `no-hate` | 68,5% | 68,4% |
| `hate` | 31,5% | 31,6% |

> Sem `stratify`, como o dataset é desbalanceado, o teste poderia acabar com bem menos (ou mais) exemplos de `hate` por puro acaso.

---

## ✅ Resumo

- O dataset só tem `train`, então o teste é criado com `train_test_split`.
- 80/20, com **4.536** exemplos de treino e **1.134** de teste.
- `stratify` preserva a proporção das classes; `random_state` torna o split reproduzível.
