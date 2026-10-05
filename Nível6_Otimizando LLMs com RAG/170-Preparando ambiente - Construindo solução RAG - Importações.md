<h1 align="center">📦 Preparando ambiente - Construindo solução RAG - Importações</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-LangChain-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">⚙️ Ambiente</h2>

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install langchain langchain-openai langchain-community langchain-text-splitters langchain-chroma pypdf python-dotenv
```

`.env` (já está no `.gitignore`):

```env
OPENAI_API_KEY=sk-...
```

---

## 📥 Importações

```python
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()
```

| Pacote | Usado para |
| :--- | :--- |
| `langchain-community` | `PyPDFLoader` (lê o PDF via `pypdf`) |
| `langchain-text-splitters` | Dividir em chunks |
| `langchain-openai` | LLM e embeddings da OpenAI |
| `langchain-chroma` | Banco vetorial **Chroma** |
| `langchain-core` | Prompt, parser e runnables da chain |
| `python-dotenv` | Carregar a `OPENAI_API_KEY` do `.env` |

---

## ✅ Resumo

- Um pacote por responsabilidade: loader, splitter, modelos, banco vetorial.
- Código: [170-...Importações.py](170-Preparando%20ambiente%20-%20Construindo%20solução%20RAG%20-%20Importações.py)
