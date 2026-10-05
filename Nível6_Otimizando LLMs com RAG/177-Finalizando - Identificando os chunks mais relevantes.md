<h1 align="center">🎯 Finalizando - Identificando os chunks mais relevantes</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-Similarity_Search-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">📌 Ver o que o retriever encontrou</h2>

Útil para **depurar**: a resposta está ruim porque o LLM errou ou porque a busca trouxe os chunks errados?

```python
def chunks_relevantes(vectorstore, pergunta: str, k: int = 4):
    for doc, score in vectorstore.similarity_search_with_score(pergunta, k=k):
        pagina = doc.metadata.get("page", 0) + 1
        print(f"[pág. {pagina} | distância {score:.3f}] {doc.page_content[:120]}...")
```

```text
[pág. 3 | distância 0.412] O cliente pode solicitar reembolso em até 7 dias...
[pág. 3 | distância 0.587] A nota fiscal deve ser apresentada no momento...
```

| Item | Leitura |
| :--- | :--- |
| `score` (Chroma) | **Distância** — quanto **menor**, mais similar |
| `page` | Começa em 0 → somar 1 para exibir |

---

## ✅ Resumo

- `similarity_search_with_score` mostra os chunks e a proximidade de cada um.
- Base para **citar fontes** e ajustar `chunk_size` / `k`.
