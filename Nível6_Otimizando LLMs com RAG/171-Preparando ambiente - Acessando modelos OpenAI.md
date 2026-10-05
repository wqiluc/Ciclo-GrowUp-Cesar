<h1 align="center">🔑 Preparando ambiente - Acessando modelos OpenAI</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-OpenAI-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">📌 Dois modelos no RAG</h2>

| Modelo | Classe | Função |
| :--- | :--- | :--- |
| **Chat** (`gpt-4o-mini`) | `ChatOpenAI` | Gerar a resposta final |
| **Embedding** (`text-embedding-3-small`) | `OpenAIEmbeddings` | Transformar texto em vetor |

```python
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

print(llm.invoke("Explique RAG em uma frase.").content)
print(len(embeddings.embed_query("teste")))   # 1536 dimensões
```

> 💡 `temperature=0` deixa a resposta mais **fiel ao contexto** — o ideal para RAG.

---

## ✅ Resumo

- `ChatOpenAI` gera, `OpenAIEmbeddings` vetoriza.
- A chave vem do `.env` via `load_dotenv()`.
