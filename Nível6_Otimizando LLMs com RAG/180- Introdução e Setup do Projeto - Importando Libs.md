<h1 align="center">📦 Introdução e Setup do Projeto - Importando Libs</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-LangChain-111827?style=flat-square&logo=langchain&logoColor=white" />
</p>

<h2 align="left">⚙️ Ambiente</h2>

```bash
pip install langchain langchain-community langchain-text-splitters langchain-chroma langchain-openai gitpython python-dotenv jupyter
jupyter notebook   # abre em localhost:8888
```

---

## 📥 Importações

```python
from langchain_community.document_loaders.generic import GenericLoader
from langchain_community.document_loaders.parsers import LanguageParser
from langchain_text_splitters import Language, RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

import os
from git import Repo
```

| Import | Usado para |
| :--- | :--- |
| `GenericLoader` | Varre arquivos do sistema (`glob`) |
| `LanguageParser` | Lê código entendendo a linguagem (separa funções/classes) |
| `Language` + `RecursiveCharacterTextSplitter` | Chunks usando separadores do Python (`class`, `def`...) |
| `Chroma` / `OpenAIEmbeddings` | Banco vetorial + embeddings |
| `ChatOpenAI` / `ChatPromptTemplate` | LLM e prompt |
| `create_stuff_documents_chain` | "Enfia" os docs recuperados no prompt |
| `create_retrieval_chain` | Liga retriever → chain de documentos |
| `Repo` (GitPython) | Clonar o repositório |

> ⚠️ No **LangChain ≥ 1.0** as chains clássicas (`langchain.chains...`) foram movidas para o pacote `langchain-classic` → `from langchain_classic.chains import ...`.

---

## ✅ Resumo

- Novas peças: `GenericLoader`, `LanguageParser`, splitter por `Language` e `GitPython`.
- Código: [180-...Importando Libs.py](180-%20Introdução%20e%20Setup%20do%20Projeto%20-%20Importando%20Libs.py)
