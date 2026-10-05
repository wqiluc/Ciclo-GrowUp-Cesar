<h1 align="center">✂️ Desenvolvendo RAG - Separando o documento em Chunks</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-Text_Splitter-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">📌 RecursiveCharacterTextSplitter</h2>

```python
def separar_chunks(documentos):
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_documents(documentos)
    print(f"{len(chunks)} chunks gerados")
    return chunks
```

| Parâmetro | Função |
| :--- | :--- |
| `chunk_size` | Tamanho máximo de cada chunk (caracteres) |
| `chunk_overlap` | Trecho repetido entre chunks vizinhos para não cortar ideias |

**Recursivo**: tenta quebrar primeiro em `\n\n` (parágrafos), depois `\n`, depois espaço — mantendo o texto o mais natural possível.

```text
|----- chunk 1 (1000) -----|
                     |----- chunk 2 (1000) -----|
                     ↑ 200 de overlap
```

---

## ✅ Resumo

- Chunks pequenos = busca precisa + prompt enxuto.
- O `metadata` da página é herdado por cada chunk.
