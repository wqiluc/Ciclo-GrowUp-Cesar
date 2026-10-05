<h1 align="center">🔗 Desenvolvendo RAG - Método retriever e chain</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-LCEL-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">📌 Retriever</h2>

```python
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
```

Recebe a pergunta (texto) e devolve os **4 chunks** mais similares.

---

## 🧩 Prompt + chain (LCEL)

```python
prompt = ChatPromptTemplate.from_template(
    """Você é um assistente que responde perguntas sobre um documento.
Use apenas o contexto abaixo. Se a resposta não estiver nele, diga que não encontrou no documento.

Contexto:
{context}

Pergunta: {question}"""
)


def formatar_docs(docs) -> str:
    return "\n\n".join(doc.page_content for doc in docs)


chain = (
    {"context": retriever | formatar_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)
```

| Peça | O que faz |
| :--- | :--- |
| `retriever \| formatar_docs` | Busca chunks e junta em um texto só → `{context}` |
| `RunnablePassthrough()` | Repassa a pergunta original → `{question}` |
| `prompt` | Preenche o template |
| `llm` | Gera a resposta |
| `StrOutputParser()` | Extrai só o texto da mensagem |

---

## ✅ Resumo

- O operador `|` encadeia etapas: a saída de uma vira entrada da próxima.
- `chain.invoke("pergunta")` roda o RAG inteiro.
