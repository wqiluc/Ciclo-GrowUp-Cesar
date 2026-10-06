<h1 align="center">🧪 Setup ambiente Colab</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_7-Otimizando_LLMs_com_Fine_Tuning-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Fine_Tuning-Setup_Colab-111827?style=flat-square&logo=huggingface&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Preparar um notebook no **Google Colab** com **GPU** e as bibliotecas do **Hugging Face** para fazer o fine-tuning do **BERT**.

---

## ☁️ Por que Colab

Treinar um BERT (~110M parâmetros) em CPU leva horas. O Colab oferece uma **GPU gratuita** (T4) direto no navegador, sem instalar nada localmente.

| | Local (CPU) | Colab (GPU T4) |
| :--- | :--- | :--- |
| **Setup** | Python, CUDA, drivers | Só o navegador |
| **Tempo de treino** (2 épocas) | Horas | Poucos minutos |
| **Custo** | Grátis | Grátis (com limite de uso) |

---

## ⚙️ Ativando a GPU

**Ambiente de execução → Alterar o tipo de ambiente de execução → T4 GPU**

```python
import torch

print(torch.cuda.is_available())      # True
print(torch.cuda.get_device_name(0))  # Tesla T4
```

> Se aparecer `False`, o notebook está em CPU: o treino vai funcionar, mas muito mais devagar.

---

## 📦 Bibliotecas

```python
!pip install -q transformers datasets evaluate accelerate
```

| Biblioteca | Para quê |
| :--- | :--- |
| `transformers` | Modelo (`AutoModelForSequenceClassification`), tokenizer, `Trainer`, `pipeline` |
| `datasets` | Carregar e transformar o dataset (`map`, `train_test_split`) |
| `evaluate` | Métricas prontas (accuracy, f1) |
| `accelerate` | Usado por baixo pelo `Trainer` para rodar na GPU |

> `torch` já vem instalado no Colab.

---

## 🔑 Login no Hugging Face

O modelo treinado vai ser enviado para o **Hugging Face Hub** (aula 230), então é preciso um token com permissão de **Write**:

1. [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) → **Create new token** → tipo **Write**.
2. No Colab, ícone de 🔑 **Secrets** → adicionar `HF_TOKEN` com o valor do token.

```python
from google.colab import userdata
from huggingface_hub import login

login(token=userdata.get("HF_TOKEN"))
```

> Alternativa interativa: `from huggingface_hub import notebook_login; notebook_login()`. Usar **Secrets** evita colar o token no notebook.

---

## ✅ Resumo

- Colab = GPU gratuita para treinar o BERT em minutos.
- Ativar **T4 GPU** e conferir com `torch.cuda.is_available()`.
- Instalar `transformers`, `datasets`, `evaluate` e `accelerate`.
- Logar no Hugging Face com um token **Write** guardado em **Secrets**.
