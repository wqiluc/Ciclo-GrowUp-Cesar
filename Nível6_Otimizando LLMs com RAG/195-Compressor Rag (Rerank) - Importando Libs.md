<h1 align="center">📦 Compressor Rag (Rerank) - Importando Libs</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-Rerank_RAG-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">⚙️ Ambiente</h2>

```bash
pip install langchain-classic langchain-community langchain-text-splitters langchain-chroma langchain-openai langchain-cohere pypdf python-dotenv
```

```bash
# .env
OPENAI_API_KEY=sk-...
COHERE_API_KEY=...
```

> 💡 A chave da Cohere sai em [dashboard.cohere.com](https://dashboard.cohere.com/api-keys) (a trial key é gratuita, com limite de chamadas).

---

## 📥 Importações

```python
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_cohere import CohereRerank
from langchain_core.prompts import ChatPromptTemplate
from langchain_classic.retrievers import ContextualCompressionRetriever
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
```

| Import | Usado para |
| :--- | :--- |
| `PyPDFLoader` | Carregar o PDF (1 `Document` por página) |
| `RecursiveCharacterTextSplitter` | Separar em chunks |
| `Chroma` + `OpenAIEmbeddings` | Vector store + **base retriever** |
| `CohereRerank` | **Compressor**: reordena e corta os chunks |
| `ContextualCompressionRetriever` | Junta base retriever + compressor |
| `create_stuff_documents_chain` / `create_retrieval_chain` | Mesma chain das aulas 184 e 192 |

> ⚠️ No **LangChain ≥ 1.0** o `ContextualCompressionRetriever` fica em `langchain_classic.retrievers`.

---

## ✅ Resumo

- Novidades: `langchain-cohere` (`CohereRerank`) + `ContextualCompressionRetriever`.
- Código: [195-...Importando Libs.py](195-Compressor%20Rag%20(Rerank)%20-%20Importando%20Libs.py)
