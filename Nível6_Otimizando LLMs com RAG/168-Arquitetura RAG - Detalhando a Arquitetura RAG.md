<h1 align="center">🔬 Arquitetura RAG - Detalhando a Arquitetura RAG</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Arquitetura-RAG-111827?style=flat-square" />
</p>

<h2 align="left">📌 Do PDF à resposta, passo a passo</h2>

| # | Etapa | Ferramenta no projeto |
| :---: | :--- | :--- |
| 1 | Carregar o PDF | `PyPDFLoader` |
| 2 | Dividir em chunks | `RecursiveCharacterTextSplitter` |
| 3 | Gerar embeddings | `OpenAIEmbeddings` |
| 4 | Salvar no banco vetorial | `Chroma` |
| 5 | Buscar chunks relevantes | `vectorstore.as_retriever()` |
| 6 | Montar prompt com contexto | `ChatPromptTemplate` |
| 7 | Gerar resposta | `ChatOpenAI` |
| 8 | Encadear tudo | **chain** (LCEL `\|`) |

```mermaid
sequenceDiagram
    participant U as 👤 Usuário
    participant R as 🔎 Retriever
    participant V as 🗄️ Chroma
    participant L as 🧠 LLM
    U->>R: pergunta
    R->>V: embedding da pergunta
    V-->>R: top-k chunks
    R->>L: prompt (instrução + chunks + pergunta)
    L-->>U: resposta fundamentada
```

---

## 🧩 Prompt típico de RAG

```text
Você é um assistente que responde perguntas sobre o documento.
Use apenas o contexto abaixo. Se não souber, diga que não encontrou.

Contexto:
{context}

Pergunta: {question}
```

---

## ✅ Resumo

- 8 etapas, cada uma mapeada para um componente do **LangChain**.
- Próximo passo: preparar o **ambiente** e começar o código.
