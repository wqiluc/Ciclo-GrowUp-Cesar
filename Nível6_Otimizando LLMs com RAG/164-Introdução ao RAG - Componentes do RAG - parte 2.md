<h1 align="center">🧱 Introdução ao RAG - Componentes do RAG - parte 2</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Conceito-Componentes_RAG-111827?style=flat-square" />
</p>

<h2 align="left">📌 Etapa de consulta (responder perguntas)</h2>

| Componente | Função |
| :--- | :--- |
| **Retriever** | Transforma a pergunta em embedding e busca os **k** chunks mais similares |
| **Prompt Template** | Monta o prompt com instrução + chunks recuperados + pergunta |
| **LLM** | Gera a resposta a partir do prompt aumentado |
| **Chain** | Liga tudo em um fluxo único: pergunta → retriever → prompt → LLM → resposta |

```mermaid
flowchart LR
    Q["❓ Pergunta"] --> E["🔢 Embedding"] --> R["🔎 Retriever"]
    V["🗄️ Vector Store"] --> R
    R -->|top-k chunks| P["📝 Prompt"]
    Q --> P
    P --> L["🧠 LLM"] --> S["✅ Resposta"]
```

---

## 🧩 Similaridade

A busca compara o vetor da pergunta com os vetores dos chunks (ex.: **similaridade de cosseno**) e devolve os mais próximos.

| Parâmetro | Efeito |
| :--- | :--- |
| `k` baixo | Contexto mais focado, risco de faltar informação |
| `k` alto | Mais contexto, mais tokens e mais ruído |

---

## ✅ Resumo

- Consulta: **pergunta → busca → prompt aumentado → LLM**.
- O **retriever** é o "R" do RAG; o **LLM** é o "G".
