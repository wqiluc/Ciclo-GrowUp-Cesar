# pip install crewai python-dotenv
from crewai import LLM, Agent
from dotenv import load_dotenv

load_dotenv()

llm = LLM(model="gpt-4o-mini", temperature=0.2)

pesquisador = Agent(
    role="Pesquisador de tecnologia",
    goal="Encontrar os fatos mais relevantes sobre {tema}",
    backstory="Você é um pesquisador meticuloso que sempre separa fato de opinião.",
    llm=llm,
    verbose=True,
    allow_delegation=False,
)

redator = Agent(
    role="Redator técnico",
    goal="Transformar a pesquisa sobre {tema} em um texto curto e didático",
    backstory="Você escreve para iniciantes, em português, com frases curtas e exemplos.",
    llm=llm,
    verbose=True,
)

if __name__ == "__main__":
    # Agent.kickoff executa o agente sozinho, sem Task/Crew
    print(pesquisador.kickoff("Liste 3 fatos sobre agentes de IA.").raw)
