<h1 align="center">📰 Agente News Analyst</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/CrewAI-News_Analyst-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Criar uma **tool de busca de notícias** e o agente que resume o que está acontecendo com cada empresa e o **sentimento** do mercado.

---

## 🛠️ Tool de notícias

```python
from ddgs import DDGS


@tool("Busca de notícias recentes")
def search_news(query: str) -> str:
    """Busca notícias da última semana. Use o nome da empresa + 'stock' (ex.: 'Apple stock')."""
    results = DDGS().news(query, max_results=8, timelimit="w")
    return "\n\n".join(f"[{r['date'][:10]}] {r['source']} - {r['title']}\n{r['body']}\n{r['url']}" for r in results)
```

`timelimit="w"` limita à última semana: é exatamente o que o ChatGPT da aula 233 **não** tinha.

> Alternativa com mais qualidade: `SerperDevTool` do `crewai-tools` (Google, precisa de `SERPER_API_KEY`).

---

## 📰 Agente e Task

```python
news_analyst = Agent(
    role="News Analyst",
    goal="Encontrar e interpretar as notícias mais relevantes sobre {acoes}",
    backstory="Jornalista de mercado financeiro. Separa fatos de boatos e sempre cita a fonte.",
    tools=[search_news],
    llm=llm,
)
```

A task pede, por ticker, os **3–5 principais fatos**, um **sentimento** (positivo / neutro / negativo) e as **fontes**.

---

## ✅ Resumo

- `ddgs` busca notícias recentes sem API key.
- O agente resume, classifica o sentimento e cita fontes (rastreabilidade).
- Preço (245) + notícias (246) = as duas visões que o analista-chefe vai cruzar.
