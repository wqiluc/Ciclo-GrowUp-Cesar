<h1 align="center">🔎 Parent Rag - Método de Parent Retriever</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-Parent_RAG-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🧱 Montando o retriever</h2>

```python
def criar_parent_retriever(documentos):
    vectorstore = Chroma(collection_name="child_chunks", embedding_function=embeddings)  # children
    store = InMemoryStore()  # parents
    retriever = ParentDocumentRetriever(
        vectorstore=vectorstore,
        docstore=store,
        child_splitter=child_splitter,
        parent_splitter=parent_splitter,
    )
    retriever.add_documents(documentos)
    return retriever
```

| Parâmetro | Função |
| :--- | :--- |
| `vectorstore` | Guarda os **embeddings dos children** |
| `docstore` | Guarda os **parents** completos, por id |
| `child_splitter` | Gera os children de cada parent |
| `parent_splitter` | Gera os parents (sem ele, o parent é o **documento inteiro**) |

---

## ⚙️ O que acontece por baixo

| Momento | Passos |
| :--- | :--- |
| `add_documents` | Doc → parents (cada um recebe um `doc_id`) → children com `metadata["doc_id"]` → embeddings no Chroma; parents no `InMemoryStore` |
| `invoke(pergunta)` | Busca por similaridade nos **children** → lê os `doc_id` → devolve os **parents** (sem repetir) |

```python
retriever.vectorstore.similarity_search(pergunta, k=1)  # child: ~400 chars
retriever.invoke(pergunta)                              # parent: até ~4000 chars
```

> ⚠️ O `InMemoryStore` some quando o processo termina, então a base é recriada a cada execução (o Chroma aqui também fica em memória, sem `persist_directory`). Para persistir, use um docstore em disco/banco nos dois.

---

## ✅ Resumo

- `ParentDocumentRetriever` = vector store (children) + docstore (parents) + 2 splitters.
- Busca pelo filho, devolve o pai.
- Código: [191-...Método de Parent Retriever.py](191-Parent%20Rag%20-%20Método%20de%20Parent%20Retriever.py)
