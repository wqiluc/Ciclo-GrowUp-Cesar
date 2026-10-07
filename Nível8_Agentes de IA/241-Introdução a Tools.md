<h1 align="center">🛠️ Introdução a Tools</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/CrewAI-Tools-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Dar "mãos" aos agentes: usar tools prontas do `crewai-tools` e criar tools próprias.

---

## 🧠 Como o agente usa uma tool

O LLM recebe o **nome**, a **descrição** e os **argumentos** de cada tool. Ele decide se chama, com quais argumentos, e lê o retorno antes de continuar.

> A **docstring/descrição** é o que o LLM lê: ela decide se a tool vai ser usada corretamente.

---

## 📦 Tools prontas (`crewai-tools`)

| Tool | O que faz |
| :--- | :--- |
| `SerperDevTool` | Busca no Google (precisa de `SERPER_API_KEY`) |
| `ScrapeWebsiteTool` | Lê o conteúdo de uma página |
| `FileReadTool` / `FileWriterTool` | Lê / escreve arquivos |
| `PDFSearchTool`, `CSVSearchTool` | RAG em cima de arquivos |

---

## ✍️ Tool própria com `@tool`

```python
from crewai.tools import tool


@tool("Calculadora de variação percentual")
def variacao_percentual(inicial: float, final: float) -> str:
    """Calcula a variação percentual entre um valor inicial e um final."""
    return f"{(final / inicial - 1) * 100:+.2f}%"


analista = Agent(..., tools=[variacao_percentual])
```

Para tools mais complexas (estado, validação), dá para herdar de `BaseTool` com `args_schema` (Pydantic).

---

## ✅ Resumo

- Tools são funções que o agente chama sozinho quando precisa.
- `crewai-tools` traz busca, scraping, arquivos e RAG prontos.
- `@tool` + docstring clara = tool própria em poucas linhas.
