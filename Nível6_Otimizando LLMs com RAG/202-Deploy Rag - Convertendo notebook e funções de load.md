<h1 align="center">📓 Deploy Rag - Convertendo notebook e funções de load</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AWS-Deploy_RAG-111827?style=flat-square&logo=amazonwebservices&logoColor=white" />
</p>

<h2 align="left">🔄 Notebook → script</h2>

A Lambda não executa células: ela importa um **módulo** e chama uma função. Então o notebook vira um `app.py` com:

- imports + `load_dotenv()` no topo;
- funções de **load** (PDF → chunks → Chroma → retriever);
- objetos pesados criados **no nível do módulo**.

```python
def carregar_pdf(caminho: str):
    return PyPDFLoader(caminho).load()


def criar_retriever(documentos):
    vectorstore = Chroma.from_documents(text_splitter.split_documents(documentos), embeddings)
    return vectorstore.as_retriever(search_kwargs={"k": 3})


retriever = criar_retriever(carregar_pdf(PDF_PATH))
```

---

## 🥶 Cold start

| Momento | O que roda |
| :--- | :--- |
| 1ª invocação (cold start) | Módulo inteiro: carrega PDF, gera embeddings, monta o Chroma |
| Próximas (warm) | Só o handler, reaproveitando o `retriever` em memória |

> 💡 Indexar no cold start é ok para um PDF pequeno. Para bases grandes, o Vector DB fica fora da Lambda (ex.: Chroma/pgvector em um servidor).

---

## ✅ Resumo

- Notebook vira módulo com funções reaproveitáveis.
- Código: [202-...funções de load.py](202-Deploy%20Rag%20-%20Convertendo%20notebook%20e%20funções%20de%20load.py)
