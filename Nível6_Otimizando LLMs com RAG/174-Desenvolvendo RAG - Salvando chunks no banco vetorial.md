<h1 align="center">🗄️ Desenvolvendo RAG - Salvando chunks no banco vetorial</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-Chroma-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">📌 Chroma</h2>

```python
def salvar_vetores(chunks):
    return Chroma.from_documents(chunks, embeddings, persist_directory=CHROMA_DIR)
```

`from_documents` faz, de uma vez: gerar o **embedding** de cada chunk e **salvar** vetor + texto + metadata.

| Parâmetro | Função |
| :--- | :--- |
| `chunks` | Documentos a indexar |
| `embeddings` | Modelo que gera os vetores |
| `persist_directory` | Pasta onde o banco é salvo em disco (`chroma_db/`) |

```python
vectorstore.similarity_search("assunto principal do documento", k=1)
```

> 💡 Persistir evita pagar os embeddings de novo a cada execução. `chroma_db/` fica fora do git.

---

## ✅ Resumo

- Chroma = banco vetorial local, simples para estudo.
- Indexação concluída: o PDF agora é pesquisável por **significado**.
