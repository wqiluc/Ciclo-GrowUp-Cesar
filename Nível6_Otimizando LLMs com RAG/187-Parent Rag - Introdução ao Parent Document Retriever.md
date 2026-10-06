<h1 align="center">👨‍👧 Parent Rag - Introdução ao Parent Document Retriever</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-Parent_RAG-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">⚠️ Revisão: limites do Naive RAG</h2>

<img src="../img/parentrag1.png" width="800">

1. **Chunk size e Top-K**
2. **Conhecimento de mundo**
3. **Perda de informação**

<img src="../img/parentrag2.png" width="800">

O **Advanced RAG** reúne técnicas que atacam esses pontos. A primeira: **Parent Document Retriever**.

---

## ⚖️ Precision × Context

<img src="../img/parentrag3.png" width="800">

| Chunk | Embedding | Contexto para o LLM |
| :--- | :--- | :--- |
| **Pequeno** | Preciso: o vetor representa uma ideia só | Pobre: trecho sem o entorno |
| **Grande** | Diluído: muitas ideias em um vetor | Rico: o LLM vê o trecho completo |

> 💡 No Naive RAG o **mesmo** chunk serve para buscar e para responder, então é preciso escolher um lado. O Parent RAG separa as duas coisas.

---

## 🧩 Como funciona

<img src="../img/parentrag4.png" width="800">

1. Documentos → **parent chunks** (grandes) → guardados em um **memory store** (texto, por id).
2. Cada parent → **child chunks** (pequenos) → **embedding** → **VectorStore**, com o id do parent nos metadados.

<img src="../img/parentrag5.png" width="800">

```mermaid
flowchart LR
    U["👤 Usuário"] --> Q["❓ Question"] --> E["🔢 Embedding"] --> V[("🗄️ Vector DB<br/>child chunks")]
    V --> S["📄 Relevant Small Chunk"] --> P["📚 Parent Chunk<br/>(Larger)"]
    Q --> C["❓📄 Question +<br/>Relevant Large Chunk"]
    P --> C --> L["🧠 LLM"] --> R["Response"] --> U
```

> 🎯 **Busca com o filho (precisão), responde com o pai (contexto).**

---

## ✅ Resumo

- Naive RAG: um chunk só para busca e resposta → trade-off precisão × contexto.
- Parent RAG: **child** pequeno no vector DB para a busca; **parent** grande no docstore vai para o LLM.
