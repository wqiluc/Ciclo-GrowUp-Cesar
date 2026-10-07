<h1 align="center">✍️ Agente Newsletter Writer</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/CrewAI-Newsletter_Writer-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Criar o último agente: transforma a recomendação técnica em uma **newsletter** clara e personalizada para o cliente.

---

## ✍️ Agente

```python
newsletter_writer = Agent(
    role="Newsletter Writer",
    goal="Escrever uma newsletter de investimentos envolvente e fácil de entender para {cliente}",
    backstory=(
        "Redator de finanças pessoais. Explica mercado sem jargão, usa o tom combinado "
        "no briefing e nunca promete retorno."
    ),
    llm=llm,
)
```

## 📋 Task

```python
newsletter_task = Task(
    description="Escreva a newsletter para {cliente} usando o briefing, as análises e a recomendação do analista-chefe.",
    expected_output="Markdown com: título, saudação, resumo do mercado, uma seção por ticker "
                    "(preço, notícias, recomendação, riscos), próximos passos e aviso legal.",
    agent=newsletter_writer,
    output_file="output/newsletter.md",
)
```

- `output_file` grava a newsletter em disco ao final.
- O **aviso legal** ("não é recomendação de investimento") fica no `expected_output` para não ser esquecido.

---

## ✅ Resumo

- O redator não analisa nada: só **comunica** o que a equipe concluiu.
- O tom vem do briefing do Customer Manager, fechando o ciclo da personalização.
- A saída final é um `.md` pronto para enviar.
