<h1 align="center">🚢 Criando e utilizando a Crew</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/CrewAI-Crew-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Juntar agentes (238) e tasks (239) em uma **Crew** e executá-la com `kickoff`.

---

## 🚢 Montando a Crew

```python
from crewai import Crew, Process

crew = Crew(
    agents=[pesquisador, redator],
    tasks=[pesquisa, artigo],
    process=Process.sequential,
    verbose=True,
)

result = crew.kickoff(inputs={"tema": "agentes de IA"})
print(result.raw)
```

- `inputs` preenche todos os `{tema}` dos agentes e tasks.
- No `sequential`, as tasks rodam na **ordem da lista**.

---

## 📦 O que o `kickoff` retorna

| Atributo | Conteúdo |
| :--- | :--- |
| `result.raw` | Texto final (saída da última task) |
| `result.tasks_output` | Saída de **cada** task |
| `result.token_usage` | Tokens gastos (útil para estimar custo) |
| `result.pydantic` / `result.json_dict` | Saída estruturada, se a task usou `output_pydantic` |

---

## ✅ Resumo

- `Crew(agents, tasks, process)` monta a equipe.
- `kickoff(inputs={...})` executa e preenche as variáveis.
- `tasks_output` e `token_usage` ajudam a depurar e medir custo.
