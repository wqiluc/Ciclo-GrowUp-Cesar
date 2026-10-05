<h1 align="center">🏁 Finalizando - Finalizando solução RAG - Recapitulação</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-RAG_PDF-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">📌 Fluxo completo</h2>

```mermaid
flowchart LR
    subgraph I["📥 Indexação (1x)"]
        A["📄 PyPDFLoader"] --> B["✂️ Splitter"] --> C["🔢 OpenAIEmbeddings"] --> D[("🗄️ Chroma")]
    end
    subgraph Q["💬 Consulta"]
        P["❓ Pergunta"] --> R["🔎 Retriever k=4"] --> T["📝 Prompt"] --> L["🧠 ChatOpenAI"] --> S["✅ Resposta"]
    end
    D --> R
```

| Aula | Etapa | Função |
| :---: | :--- | :--- |
| 172 | Carregar PDF | `carregar_pdf` |
| 173 | Chunks | `separar_chunks` |
| 174 | Banco vetorial | `salvar_vetores` |
| 175 | Retriever + chain | `criar_chain` |
| 176 | Execução | `preparar_base` / `executar` |
| 177 | Debug da busca | `chunks_relevantes` |

---

## ▶️ Rodar

```bash
# coloque o PDF como documento.pdf nesta pasta
python "178-Finalizando - Finalizando solução RAG - Recapitulação.py"
```

---

## ✅ Resumo do módulo

- LLMs não conhecem dados privados/atuais e **alucinam**; colar tudo no prompt não escala.
- **RAG** busca só os trechos relevantes e os injeta no prompt.
- Com **LangChain + Chroma + OpenAI**: PDF → chunks → embeddings → busca → resposta fundamentada.
- Próximo módulo: **RAG Code Review**.
