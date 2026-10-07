# pip install crewai ddgs python-dotenv
from crewai import LLM, Agent, Crew, Task
from crewai.tools import tool
from ddgs import DDGS
from dotenv import load_dotenv

load_dotenv()

llm = LLM(model="gpt-4o-mini", temperature=0.2)


@tool("Busca de notícias recentes")
def search_news(query: str) -> str:
    """Busca notícias da última semana. Use o nome da empresa + 'stock' (ex.: 'Apple stock')."""
    results = DDGS().news(query, max_results=8, timelimit="w")
    if not results:
        return f"Nenhuma notícia encontrada para '{query}'."
    return "\n\n".join(
        f"[{r['date'][:10]}] {r['source']} - {r['title']}\n{r['body']}\n{r['url']}" for r in results
    )


news_analyst = Agent(
    role="News Analyst",
    goal="Encontrar e interpretar as notícias mais relevantes sobre {acoes}",
    backstory="Jornalista de mercado financeiro. Separa fatos de boatos e sempre cita a fonte.",
    tools=[search_news],
    llm=llm,
    verbose=True,
)

news_task = Task(
    description=(
        "Para cada ticker em {acoes}, busque as notícias da última semana e identifique "
        "o que pode impactar o preço da ação."
    ),
    expected_output=(
        "Por ticker: 3 a 5 fatos principais, sentimento geral (positivo/neutro/negativo) "
        "com justificativa e a lista de fontes (URLs)."
    ),
    agent=news_analyst,
)

if __name__ == "__main__":
    print(search_news.run(query="Apple stock")[:800])
    crew = Crew(agents=[news_analyst], tasks=[news_task])
    print(crew.kickoff(inputs={"acoes": "AAPL"}).raw)
