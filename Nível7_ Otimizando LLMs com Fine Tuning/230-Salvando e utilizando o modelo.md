<h1 align="center">🚀 Salvando e utilizando o modelo</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_7-Otimizando_LLMs_com_Fine_Tuning-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Fine_Tuning-Salvando_e_utilizando-111827?style=flat-square&logo=huggingface&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Publicar o modelo treinado no **Hugging Face Hub** e usá-lo com a **`pipeline`** do Transformers para classificar textos novos.

---

## ☁️ Push para o Hub

```python
trainer.push_to_hub()
```

Cria (ou atualiza) o repositório **`<seu-usuario>/bert-hate-speech-pt`** com pesos (`model.safetensors`), `config.json`, tokenizer e um **model card** gerado automaticamente.

> Por padrão o repo usa o nome do `output_dir`. Para outro nome: `TrainingArguments(..., hub_model_id="usuario/nome")`. Para repo privado: `hub_private_repo=True`.

---

## 🪪 Model card

O card gerado pelo `Trainer` já traz:

| Campo | Exemplo (modelo do instrutor) |
| :--- | :--- |
| **Base model** | `google-bert/bert-base-uncased` |
| **Resultados** | Loss: 0.4858 · Accuracy: 0.7544 |
| **Model size** | 109M params · F32 · Safetensors |
| **Task** | Text Classification |
| **Model tree** | Aparece entre os **Finetuned** do modelo base |

Seções como *Model description* e *Intended uses & limitations* ficam como **"More information needed"**: vale preencher à mão.

---

## 🔌 Usando com `pipeline`

```python
from transformers import pipeline

classifier = pipeline("text-classification", model="<seu-usuario>/bert-hate-speech-pt")

classifier("bom dia a todos, ótima semana!")
# [{'label': 'no-hate', 'score': 0.9...}]
```

A `pipeline` baixa modelo + tokenizer do Hub e faz tokenização → modelo → softmax → label. Funciona em qualquer máquina, até em **CPU**.

| Saída | Significado |
| :--- | :--- |
| `label` | Classe prevista (`hate` / `no-hate`, graças ao `id2label` da aula 229) |
| `score` | Probabilidade da classe prevista (0 a 1) |

```python
classifier(["texto 1", "texto 2"], top_k=None)  # lista de textos e score de todas as classes
```

> Sem `id2label` no treino, a saída seria `LABEL_0` / `LABEL_1`.

---

## 🤔 Por que fine-tuning e não treinar do zero

| | Treinar do zero | Fine-tuning |
| :--- | :--- | :--- |
| **Dados** | Bilhões de textos | Alguns milhares de exemplos rotulados |
| **Hardware** | Clusters de GPU por semanas | 1 GPU gratuita por minutos |
| **Resultado** | Precisa aprender a língua inteira | Já entende a língua, só aprende a **task** |

O mesmo processo serve para outras tasks: sentimento, spam, triagem de tickets, intenção do usuário etc.

---

## ✅ Resumo

- `trainer.push_to_hub()` publica pesos, tokenizer e model card.
- `pipeline("text-classification", model=...)` carrega e usa o modelo em uma linha.
- Fine-tuning de um LM pequeno como o BERT é muito mais barato que treinar do zero ou usar um LLM para classificação.
