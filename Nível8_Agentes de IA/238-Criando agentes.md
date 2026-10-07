<h1 align="center">🧑 Criando agentes</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/CrewAI-Agents-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Criar agentes no CrewAI e entender cada parâmetro do `Agent`.

---

## 🧑 Anatomia de um Agent

```python
from crewai import LLM, Agent

llm = LLM(model="gpt-4o-mini", temperature=0.2)

pesquisador = Agent(
    role="Pesquisador de tecnologia",
    goal="Encontrar os fatos mais relevantes sobre {tema}",
    backstory="Você é um pesquisador meticuloso que sempre separa fato de opinião.",
    llm=llm,
    verbose=True,
    allow_delegation=False,
)
```

| Parâmetro | Para que serve |
| :--- | :--- |
| `role` | Quem o agente é. Vira parte do system prompt |
| `goal` | O que ele busca. Aceita **variáveis** `{tema}` preenchidas no `kickoff` |
| `backstory` | Contexto/personalidade: molda o tom e o "jeito" de trabalhar |
| `llm` | Modelo usado (string ou objeto `LLM`) |
| `tools` | Lista de tools que ele pode chamar (aula 241) |
| `verbose` | Mostra o raciocínio no terminal |
| `allow_delegation` | Se pode repassar trabalho para outros agentes |
| `max_iter` | Limite de iterações do loop (evita loop infinito) |

> `role`, `goal` e `backstory` são **prompt engineering estruturado**: quanto mais específicos, melhor o resultado.

---

## ✅ Resumo

- `Agent` = `role` + `goal` + `backstory` + `llm` (+ `tools`).
- `{variáveis}` no texto são preenchidas pelos `inputs` do `kickoff`.
- `verbose=True` ajuda a entender o que o agente está pensando.
