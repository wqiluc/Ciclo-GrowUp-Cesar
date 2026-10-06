<h1 align="center">🏁 Validação e Desafios do RAG - Response e Recapitulando</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-RAG_Code_Review-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">💬 Response</h2>

```python
response = retrieval_chain.invoke({"input": "Você pode revisar e sugerir melhorias para o código de RunnableBinding?"})
print(response["answer"])
```

| Chave | Conteúdo |
| :--- | :--- |
| `input` | A pergunta enviada |
| `context` | Lista de `Document` recuperados pelo retriever (8, via MMR) |
| `answer` | Review gerado pelo LLM com base no `context` |

> 💡 Olhar `response["context"]` mostra **de quais arquivos** veio a resposta — útil para validar se o retriever trouxe o código certo.

---

## 📌 Fluxo completo

```mermaid
flowchart LR
    subgraph I["📥 Indexação (1x)"]
        G["🐙 Repo.clone_from"] --> L["📂 GenericLoader<br/>+ LanguageParser"] --> S["✂️ from_language<br/>2000 / 200"] --> D[("🗄️ Chroma")]
    end
    subgraph Q["💬 Consulta"]
        P["❓ input"] --> R["🔎 Retriever MMR k=8"] --> T["📝 stuff_documents_chain"] --> A["✅ answer"]
    end
    D --> R
```

| Aula | Etapa | Função |
| :---: | :--- | :--- |
| 181 | Clonar e carregar código | `clonar_repo` / `carregar_codigo` |
| 182 | Chunks por linguagem | `separar_chunks` |
| 183 | Banco vetorial + retriever | `preparar_base` / `criar_retriever` |
| 184 | Prompt + chains | `criar_chain` |
| 185 | Execução | `revisar` |

---

## ▶️ Rodar

```bash
python "185-Validação e Desafios do RAG - Response e Recapitulando.py"
```

---

## ✅ Resumo

- `retrieval_chain.invoke({"input": ...})` → `answer` + `context` (fontes).
- Mesmo RAG do PDF, adaptado para código: loader, splitter e retriever trocados.
- Código: [185-...Response e Recapitulando.py](185-Validação%20e%20Desafios%20do%20RAG%20-%20Response%20e%20Recapitulando.py)
