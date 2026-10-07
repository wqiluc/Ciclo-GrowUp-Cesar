# pip install crewai python-dotenv
from crewai import LLM, Agent, Task
from crewai.tools import tool
from dotenv import load_dotenv

load_dotenv()


@tool("Calculadora de variação percentual")
def variacao_percentual(inicial: float, final: float) -> str:
    """Calcula a variação percentual entre um valor inicial e um final."""
    return f"{(final / inicial - 1) * 100:+.2f}%"


analista = Agent(
    role="Analista financeiro",
    goal="Responder perguntas sobre variação de preços com precisão",
    backstory="Você nunca calcula de cabeça: sempre usa a calculadora.",
    llm=LLM(model="gpt-4o-mini", temperature=0),
    tools=[variacao_percentual],
    verbose=True,
)

task = Task(
    description="Uma ação foi de US$ 172,50 para US$ 189,98. Qual foi a variação?",
    expected_output="Uma frase com a variação percentual.",
    agent=analista,
)

print(task.execute_sync().raw)
