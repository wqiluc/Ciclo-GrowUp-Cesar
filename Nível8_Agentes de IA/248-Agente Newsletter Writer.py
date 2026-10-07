# Testado junto com a Crew completa na aula 249
from pathlib import Path

from crewai import LLM, Agent, Task

OUTPUT_FILE = Path(__file__).parent / "output" / "newsletter.md"

llm = LLM(model="gpt-4o-mini", temperature=0.5)  # um pouco mais criativo para o texto

newsletter_writer = Agent(
    role="Newsletter Writer",
    goal="Escrever uma newsletter de investimentos envolvente e fácil de entender para {cliente}",
    backstory=(
        "Redator de finanças pessoais. Explica mercado sem jargão, usa o tom combinado "
        "no briefing e nunca promete retorno."
    ),
    llm=llm,
    verbose=True,
)

newsletter_task = Task(
    description=(
        "Escreva a newsletter para {cliente} usando o briefing, as análises de preço e notícias "
        "e a recomendação do analista-chefe. Escreva em português do Brasil."
    ),
    expected_output=(
        "Markdown com: título, saudação, resumo do mercado, uma seção por ticker "
        "(preço, notícias, recomendação, riscos), próximos passos e aviso legal "
        "de que o conteúdo não é recomendação de investimento."
    ),
    agent=newsletter_writer,
    output_file=str(OUTPUT_FILE),
)
