# pip install crewai python-dotenv
from crewai import LLM, Agent, Crew, Task
from dotenv import load_dotenv

load_dotenv()

llm = LLM(model="gpt-4o-mini", temperature=0.2)

customer_manager = Agent(
    role="Customer Manager",
    goal="Entender o perfil de {cliente} e traduzir em um briefing claro para a equipe de análise",
    backstory=(
        "Você é gerente de relacionamento de uma corretora. Conhece bem o cliente "
        "e garante que toda análise respeite o perfil de risco e o objetivo dele."
    ),
    llm=llm,
    verbose=True,
)

customer_task = Task(
    description=(
        "Cliente: {cliente}\nPerfil de investidor: {perfil}\nAções de interesse: {acoes}\n\n"
        "Monte um briefing para a equipe: objetivo do cliente, tolerância a risco, "
        "horizonte de tempo, tickers a analisar e o tom ideal da newsletter."
    ),
    expected_output="Briefing em tópicos com: objetivo, risco, horizonte, lista de tickers e tom.",
    agent=customer_manager,
)

if __name__ == "__main__":
    crew = Crew(agents=[customer_manager], tasks=[customer_task])
    print(crew.kickoff(inputs={
        "cliente": "Lucas",
        "perfil": "moderado, pensa no longo prazo, primeira vez investindo no exterior",
        "acoes": "AAPL, MSFT",
    }).raw)
