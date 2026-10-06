<h1 align="center">📤 Upload de arquivos</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_7-Otimizando_LLMs_com_Fine_Tuning-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Fine_Tuning-Upload_de_arquivos-111827?style=flat-square&logo=huggingface&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Levar para o Colab os arquivos **`train.jsonl`** e **`test.jsonl`** gerados na aula 217.

---

## 📁 Opções de upload

| Forma | Como | Observação |
| :--- | :--- | :--- |
| **Painel de arquivos** | Ícone 📁 → arrastar os arquivos | Mais simples |
| **`files.upload()`** | Botão de upload dentro da célula | Bom para deixar no notebook |
| **Google Drive** | `drive.mount("/content/drive")` | Arquivos **persistem** entre sessões |
| **Hugging Face Hub** | `load_dataset("hate-speech-portuguese/...")` | Nem precisa de upload |

> ⚠️ Arquivos enviados para `/content` **somem** quando a sessão do Colab é encerrada.

---

## 📤 Upload pela célula

```python
from google.colab import files

uploaded = files.upload()  # selecionar train.jsonl e test.jsonl
print(list(uploaded))      # ['train.jsonl', 'test.jsonl']
```

Os arquivos vão para o diretório atual (`/content`).

---

## 💾 Alternativa: Google Drive

```python
from google.colab import drive

drive.mount("/content/drive")
DATA_DIR = "/content/drive/MyDrive/fine-tuning/data"
```

---

## 🔍 Conferindo

```python
!head -n 1 train.jsonl
!wc -l train.jsonl test.jsonl
```

```
4536 train.jsonl
1134 test.jsonl
```

Mesmo formato `messages` usado na OpenAI. Na próxima aula ele é convertido para o formato que o BERT espera (`text` + `label`).

---

## ✅ Resumo

- Upload pelo painel, por `files.upload()` ou pelo **Drive** (que persiste).
- Arquivos em `/content` são temporários.
- Os mesmos `train.jsonl` / `test.jsonl` da OpenAI e do Bedrock são reaproveitados aqui.
