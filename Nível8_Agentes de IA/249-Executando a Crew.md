<h1 align="center">▶️ Executando a Crew</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/CrewAI-Kickoff-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Ligar os 5 agentes (244–248), definir quem lê a saída de quem e executar a Crew completa.

---

## 🔗 Ligando os contexts

```python
price_task.context = [customer_task]
news_task.context = [customer_task]
chief_task.context = [customer_task, price_task, news_task]
newsletter_task.context = [customer_task, chief_task]
```

> No `sequential`, se `context` não for definido, cada task recebe a saída de **todas** as anteriores. Definir explicitamente economiza tokens e deixa o fluxo legível.

---

## 🚢 Crew + kickoff

```python
crew = Crew(
    agents=[customer_manager, price_analyst, news_analyst, chief_analyst, newsletter_writer],
    tasks=[customer_task, price_task, news_task, chief_task, newsletter_task],
    process=Process.sequential,
    verbose=True,
)

result = crew.kickoff(inputs={
    "cliente": "Lucas",
    "perfil": "moderado, longo prazo, primeira vez investindo no exterior",
    "acoes": "AAPL, MSFT",
})
```

---

## 📤 Saídas

| Onde | O quê |
| :--- | :--- |
| `output/newsletter.md` | Newsletter final (gravada pelo `output_file`) |
| `chief_task.output.pydantic` | `ChiefReport` estruturado com as recomendações |
| `result.token_usage` | Tokens gastos na execução inteira |

---

## 🆚 Antes x Depois

| ChatGPT (aula 233) | Crew |
| :--- | :--- |
| Análise genérica | Personalizada pelo perfil do cliente |
| Sem preço atual | Preço real via `yfinance` |
| Sem notícias recentes | Notícias da semana com fontes |
| Texto livre | Recomendação estruturada + newsletter em `.md` |

---

## ✅ Resumo

- `context` define o grafo de dependências entre tasks.
- Uma chamada `kickoff` executa os 5 agentes em sequência.
- Resultado: newsletter com dados reais, personalizada e rastreável.
