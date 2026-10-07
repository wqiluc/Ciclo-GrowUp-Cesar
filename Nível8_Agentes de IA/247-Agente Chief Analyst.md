<h1 align="center">🧑‍💼 Agente Chief Analyst</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/CrewAI-Chief_Analyst-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Criar o agente que **cruza** briefing do cliente + análise de preço + análise de notícias e chega a uma **recomendação** por ação.

---

## 🧑‍💼 Agente

```python
chief_analyst = Agent(
    role="Chief Analyst",
    goal="Consolidar as análises de preço e notícias em uma recomendação adequada ao perfil de {cliente}",
    backstory=(
        "Analista-chefe com 20 anos de mercado. Pondera dados técnicos e notícias, "
        "é conservador nas conclusões e sempre deixa claros os riscos."
    ),
    llm=llm,
)
```

Sem tools: ele trabalha só com o que os outros agentes entregaram.

---

## 📋 Task com saída estruturada

```python
class StockRecommendation(BaseModel):
    ticker: str
    recomendacao: Literal["comprar", "manter", "vender", "aguardar"]
    confianca: Literal["baixa", "média", "alta"]
    justificativa: str
    riscos: list[str]


class ChiefReport(BaseModel):
    resumo_mercado: str
    recomendacoes: list[StockRecommendation]


chief_task = Task(..., output_pydantic=ChiefReport)
```

`output_pydantic` obriga o LLM a seguir o schema, o que deixa a saída **previsível** para o redator (e para qualquer código que consuma o resultado).

---

## ✅ Resumo

- O Chief Analyst é o "tomador de decisão" da Crew.
- Recebe as 3 tasks anteriores como `context` (ligado na aula 249).
- `output_pydantic` + `Literal` restringem a recomendação a valores válidos.
