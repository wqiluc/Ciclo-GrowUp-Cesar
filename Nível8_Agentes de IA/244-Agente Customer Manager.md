<h1 align="center">🤝 Agente Customer Manager</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/CrewAI-Customer_Manager-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Criar o primeiro agente da Crew: ele transforma os dados do cliente em um **briefing** que guia todos os outros agentes.

---

## 🤝 Agente

```python
customer_manager = Agent(
    role="Customer Manager",
    goal="Entender o perfil de {cliente} e traduzir em um briefing claro para a equipe de análise",
    backstory=(
        "Você é gerente de relacionamento de uma corretora. Conhece bem o cliente "
        "e garante que toda análise respeite o perfil de risco e o objetivo dele."
    ),
    llm=llm,
)
```

## 📋 Task

```python
customer_task = Task(
    description=(
        "Cliente: {cliente}\nPerfil de investidor: {perfil}\nAções de interesse: {acoes}\n\n"
        "Monte um briefing para a equipe: objetivo do cliente, tolerância a risco, "
        "horizonte de tempo, tickers a analisar e o tom ideal da newsletter."
    ),
    expected_output="Briefing em tópicos com: objetivo, risco, horizonte, lista de tickers e tom.",
    agent=customer_manager,
)
```

> Ele **não usa tools**: o trabalho dele é interpretar os `inputs` e padronizar o pedido.

---

## ✅ Resumo

- O Customer Manager é a "porta de entrada": define **para quem** e **o quê** analisar.
- O briefing vira `context` das próximas tasks (ligado na aula 249).
