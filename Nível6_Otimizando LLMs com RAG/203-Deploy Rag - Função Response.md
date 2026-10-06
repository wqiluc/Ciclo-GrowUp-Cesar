<h1 align="center">💬 Deploy Rag - Função Response</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AWS-Deploy_RAG-111827?style=flat-square&logo=amazonwebservices&logoColor=white" />
</p>

<h2 align="left">🧩 Uma função, uma resposta</h2>

O handler não deve conhecer a chain. Ele só chama `response(pergunta)` e recebe um **dict serializável em JSON**.

```python
def response(pergunta: str) -> dict:
    resultado = chain.invoke({"input": pergunta})
    return {
        "pergunta": pergunta,
        "resposta": resultado["answer"],
        "paginas": sorted({doc.metadata.get("page", 0) + 1 for doc in resultado["context"]}),
    }
```

| Campo | Origem |
| :--- | :--- |
| `pergunta` | Entrada |
| `resposta` | `answer` da chain |
| `paginas` | `metadata.page` dos chunks usados |

> ⚠️ `Document` não é serializável: devolva só strings/números, não o `context` cru.

---

## ✅ Resumo

- `chain` criada uma vez no módulo; `response` só invoca e formata.
- Código: [203-...Função Response.py](203-Deploy%20Rag%20-%20Função%20Response.py)
