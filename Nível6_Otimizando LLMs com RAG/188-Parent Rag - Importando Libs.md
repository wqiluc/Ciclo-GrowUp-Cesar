<h1 align="center">📦 Parent Rag - Importando Libs</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-Parent_RAG-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">⚙️ Ambiente</h2>

```bash
pip install langchain-classic langchain-community langchain-text-splitters langchain-chroma langchain-openai pypdf python-dotenv
```

---

## 📥 Importações

```python
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.stores import InMemoryStore
from langchain_core.prompts import ChatPromptTemplate
from langchain_classic.retrievers import ParentDocumentRetriever
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
```

| Import | Usado para |
| :--- | :--- |
| `PyPDFLoader` | Carregar o PDF (1 `Document` por página) |
| `RecursiveCharacterTextSplitter` | Dois splitters: **parent** e **child** |
| `Chroma` + `OpenAIEmbeddings` | Vector store dos **child chunks** |
| `InMemoryStore` | Docstore dos **parent chunks** (chave → documento) |
| `ParentDocumentRetriever` | Busca nos filhos e devolve os pais |
| `create_stuff_documents_chain` / `create_retrieval_chain` | Mesma chain das aulas 184–185 |

> ⚠️ No **LangChain ≥ 1.0** o `ParentDocumentRetriever` e as chains clássicas ficam em `langchain_classic` (antes: `langchain.retrievers` / `langchain.chains`).

---

## ✅ Resumo

- Novidades: `InMemoryStore` + `ParentDocumentRetriever`.
- Código: [188-...Importando Libs.py](188-Parent%20Rag%20-%20Importando%20Libs.py)
