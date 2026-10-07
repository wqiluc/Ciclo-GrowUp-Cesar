# Junta os agentes (238) e as tasks (239) em uma Crew
import runpy
from pathlib import Path

from crewai import Crew, Process

BASE_DIR = Path(__file__).parent
ns = runpy.run_path(str(BASE_DIR / "239-Criando tasks.py"))

crew = Crew(
    agents=[ns["agents"]["pesquisador"], ns["agents"]["redator"]],
    tasks=[ns["pesquisa"], ns["artigo"]],
    process=Process.sequential,
    verbose=True,
)

result = crew.kickoff(inputs={"tema": "agentes de IA"})

print(result.raw)
for out in result.tasks_output:
    print(f"\n--- {out.agent} ---\n{out.raw[:300]}...")
print("\nTokens:", result.token_usage)
