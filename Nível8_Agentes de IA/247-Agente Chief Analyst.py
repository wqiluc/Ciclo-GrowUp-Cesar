# Testado junto com a Crew completa na aula 249
from typing import Literal

from crewai import LLM, Agent, Task
from pydantic import BaseModel

llm = LLM(model="gpt-4o-mini", temperature=0.2)


class StockRecommendation(BaseModel):
    ticker: str
    recomendacao: Literal["comprar", "manter", "vender", "aguardar"]
    confianca: Literal["baixa", "média", "alta"]
    justificativa: str
    riscos: list[str]


class ChiefReport(BaseModel):
    resumo_mercado: str
    recomendacoes: list[StockRecommendation]


chief_analyst = Agent(
    role="Chief Analyst",
    goal="Consolidar as análises de preço e notícias em uma recomendação adequada ao perfil de {cliente}",
    backstory=(
        "Analista-chefe com 20 anos de mercado. Pondera dados técnicos e notícias, "
        "é conservador nas conclusões e sempre deixa claros os riscos."
    ),
    llm=llm,
    verbose=True,
)

chief_task = Task(
    description=(
        "Com base no briefing do cliente, na análise de preço e na análise de notícias, "
        "dê uma recomendação para cada ticker em {acoes}, coerente com o perfil '{perfil}'."
    ),
    expected_output="Resumo do mercado e, por ticker, recomendação, confiança, justificativa e riscos.",
    agent=chief_analyst,
    output_pydantic=ChiefReport,
)
