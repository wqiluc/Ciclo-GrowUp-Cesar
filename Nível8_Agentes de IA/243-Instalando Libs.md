<h1 align="center">📦 Instalando Libs</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/CrewAI-Setup-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Instalar as bibliotecas do projeto da newsletter de ações.

---

## 📦 Instalação

```bash
python -m venv .venv && source .venv/bin/activate
pip install crewai crewai-tools yfinance ddgs python-dotenv
```

| Lib | Uso no projeto |
| :--- | :--- |
| `crewai` | Agents, Tasks, Crew, `@tool` |
| `crewai-tools` | Tools prontas (opcional: `SerperDevTool`, `ScrapeWebsiteTool`) |
| `yfinance` | Histórico de preços do Yahoo Finance (sem API key) |
| `ddgs` | Busca de notícias no DuckDuckGo (sem API key) |
| `python-dotenv` | Carrega o `OPENAI_API_KEY` do `.env` |

> `ddgs` é o novo nome do pacote `duckduckgo_search`.

---

## 🧪 Teste rápido

```python
import yfinance as yf
from ddgs import DDGS

print(yf.Ticker("AAPL").history(period="5d")[["Close"]])
print(DDGS().news("Apple stock", max_results=2))
```

---

## ✅ Resumo

- `crewai` + `yfinance` + `ddgs` cobrem o projeto inteiro sem chaves além da OpenAI.
- Testar as libs isoladas antes evita depurar erro de rede "dentro" do agente.
