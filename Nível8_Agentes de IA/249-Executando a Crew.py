# pip install crewai yfinance ddgs python-dotenv
import runpy
from pathlib import Path

from crewai import Crew, Process
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).parent
cm, pa, na, ca, nw = (
    runpy.run_path(str(BASE_DIR / f))
    for f in (
        "244-Agente Customer Manager.py",
        "245-Agente Price Analyst.py",
        "246-Agente News Analyst.py",
        "247-Agente Chief Analyst.py",
        "248-Agente Newsletter Writer.py",
    )
)

customer_task, price_task, news_task = cm["customer_task"], pa["price_task"], na["news_task"]
chief_task, newsletter_task = ca["chief_task"], nw["newsletter_task"]

price_task.context = [customer_task]
news_task.context = [customer_task]
chief_task.context = [customer_task, price_task, news_task]
newsletter_task.context = [customer_task, chief_task]

crew = Crew(
    agents=[cm["customer_manager"], pa["price_analyst"], na["news_analyst"],
            ca["chief_analyst"], nw["newsletter_writer"]],
    tasks=[customer_task, price_task, news_task, chief_task, newsletter_task],
    process=Process.sequential,
    verbose=True,
)

result = crew.kickoff(inputs={
    "cliente": "Lucas",
    "perfil": "moderado, longo prazo, primeira vez investindo no exterior",
    "acoes": "AAPL, MSFT",
})

for rec in chief_task.output.pydantic.recomendacoes:
    print(f"{rec.ticker}: {rec.recomendacao} (confiança {rec.confianca})")
print("\nNewsletter salva em:", nw["OUTPUT_FILE"])
print("Tokens:", result.token_usage)
