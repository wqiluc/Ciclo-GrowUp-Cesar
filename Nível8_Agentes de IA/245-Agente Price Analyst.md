<h1 align="center">📈 Agente Price Analyst</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/CrewAI-Price_Analyst-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Criar uma **tool de cotações** com `yfinance` e o agente que analisa a tendência de preço de cada ação.

---

## 🛠️ Tool de preço

```python
import yfinance as yf
from crewai.tools import tool


@tool("Histórico de preço da ação")
def stock_price(ticker: str) -> str:
    """Retorna o resumo dos últimos 3 meses de um ticker da bolsa (ex.: AAPL, MSFT, PETR4.SA):
    último fechamento, variação, máxima, mínima, médias móveis e os últimos 10 fechamentos."""
    hist = yf.Ticker(ticker).history(period="3mo")
    ...
```

A tool já entrega **números calculados** (variação, médias móveis de 20 e 50 dias). Assim o LLM só **interpreta**, sem fazer conta, o que reduz alucinação.

> Tickers da B3 usam o sufixo `.SA` no Yahoo Finance (ex.: `PETR4.SA`).

---

## 📈 Agente e Task

```python
price_analyst = Agent(
    role="Price Analyst",
    goal="Analisar o comportamento de preço das ações {acoes} e identificar tendências",
    backstory="Analista técnico experiente. Baseia tudo em dados, nunca em achismo.",
    tools=[stock_price],
    llm=llm,
)

price_task = Task(
    description="Para cada ticker em {acoes}, use a tool de preço e analise tendência, volatilidade e momento.",
    expected_output="Por ticker: preço atual, variação no período, tendência (alta/baixa/lateral) e 2-3 observações.",
    agent=price_analyst,
)
```

---

## ✅ Resumo

- `yfinance` traz histórico gratuito, sem API key.
- A tool faz os cálculos; o agente interpreta.
- A docstring explica o formato do ticker para o LLM chamar certo.
