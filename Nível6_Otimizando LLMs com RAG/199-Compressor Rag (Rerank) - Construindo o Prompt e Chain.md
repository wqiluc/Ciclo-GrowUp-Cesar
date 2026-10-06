<h1 align="center">📝 Compressor Rag (Rerank) - Construindo o Prompt e Chain</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-Rerank_RAG-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">💬 Prompt</h2>

```python
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "Você é um assistente que responde perguntas sobre um documento. "
            "Use apenas o contexto abaixo. Se a resposta não estiver nele, diga que não encontrou no documento.\n\n{context}",
        ),
        ("user", "{input}"),
    ]
)
```

| Variável | Preenchida por |
| :--- | :--- |
| `{context}` | Os `top_n` chunks escolhidos pelo reranker |
| `{input}` | Pergunta do usuário |

---

## 🔗 Chain

```python
def criar_chain(retriever):
    document_chain = create_stuff_documents_chain(llm, prompt)
    return create_retrieval_chain(retriever, document_chain)
```

```mermaid
flowchart LR
    I["❓ input"] --> R["🗜️ ContextualCompressionRetriever<br/>(Chroma k=20 → Rerank top 3)"] --> S["📝 stuff_documents_chain"] --> L["🧠 LLM"] --> A["✅ answer"]
```

> 💡 De novo, a chain é **igual** à das aulas 184 e 192. Só o retriever mudou: o `ContextualCompressionRetriever` é um retriever como outro qualquer.

---

## ✅ Resumo

- Prompt com `{context}` + `{input}`; chain = `create_stuff_documents_chain` + `create_retrieval_chain`.
- Código: [199-...Construindo o Prompt e Chain.py](199-Compressor%20Rag%20(Rerank)%20-%20Construindo%20o%20Prompt%20e%20Chain.py)
