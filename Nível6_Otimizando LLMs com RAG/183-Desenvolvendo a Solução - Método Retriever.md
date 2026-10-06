<h1 align="center">🔎 Desenvolvendo a Solução - Método Retriever</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-Chroma_MMR-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🗄️ Banco vetorial</h2>

```python
db = Chroma.from_documents(texts, OpenAIEmbeddings(disallowed_special=()))
```

> 💡 `disallowed_special=()` libera tokens especiais (ex.: `<|endoftext|>`) que aparecem no código do LangChain — sem isso o `tiktoken` lança erro.

> ⚠️ No vídeo a chave é colocada direto no notebook (`os.environ["OPENAI_API_KEY"] = "sk-..."`). Aqui ela vem do `.env` via `load_dotenv()`.

---

## 🔎 Retriever com MMR

```python
retriever = db.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 8},
)
```

| `search_type` | Como escolhe os chunks |
| :--- | :--- |
| `"similarity"` (padrão) | Os `k` mais parecidos com a pergunta — podem ser quase repetidos |
| `"mmr"` | **Maximal Marginal Relevance**: relevantes **e** diversos entre si |

Com código, o MMR evita trazer 8 trechos do mesmo arquivo, cobrindo mais partes do projeto.

> 💡 No `.py` o banco é persistido em `chroma_code_db/` — 1278 chunks custam embeddings, então só são gerados na primeira execução.

---

## ✅ Resumo

- Chroma + `OpenAIEmbeddings(disallowed_special=())` para indexar código.
- Retriever `mmr` com `k=8` → contexto variado.
- Código: [183-...Método Retriever.py](183-Desenvolvendo%20a%20Solução%20-%20Método%20Retriever.py)
