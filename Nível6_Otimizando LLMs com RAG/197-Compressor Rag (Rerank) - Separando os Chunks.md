<h1 align="center">✂️ Compressor Rag (Rerank) - Separando os Chunks</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-Rerank_RAG-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🔪 Um splitter só</h2>

```python
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

def separar_chunks(documentos):
    chunks = text_splitter.split_documents(documentos)
    print(f"{len(chunks)} chunks gerados")
    return chunks
```

| Parâmetro | Valor | Por quê |
| :--- | :---: | :--- |
| `chunk_size` | 1000 | Chunks menores = embedding mais focado; o rerank compensa o `k` alto |
| `chunk_overlap` | 200 | Evita cortar uma ideia no meio |

> 💡 Diferente do Parent RAG, aqui é **um** splitter. A melhora vem depois da busca: recuperamos muitos chunks e o reranker escolhe.

---

## 🗄️ Indexando no Chroma

```python
def criar_vectorstore(chunks):
    return Chroma.from_documents(chunks, embeddings, collection_name="rerank_chunks")
```

---

## ✅ Resumo

- Um `RecursiveCharacterTextSplitter` (1000/200) → chunks → Chroma.
- Código: [197-...Separando os Chunks.py](197-Compressor%20Rag%20(Rerank)%20-%20Separando%20os%20Chunks.py)
