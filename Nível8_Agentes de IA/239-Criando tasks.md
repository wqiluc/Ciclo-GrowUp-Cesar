<h1 align="center">📋 Criando tasks</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/CrewAI-Tasks-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Definir **tasks** para os agentes da aula 238 e encadear a saída de uma na outra.

---

## 📋 Anatomia de uma Task

```python
from crewai import Task

pesquisa = Task(
    description="Pesquise sobre {tema}. Traga definições, exemplos de uso e limitações.",
    expected_output="Lista em tópicos com 5 a 8 fatos, cada um com 1 frase.",
    agent=pesquisador,
)

artigo = Task(
    description="Usando a pesquisa, escreva um artigo curto sobre {tema}.",
    expected_output="Artigo em markdown com título, 3 seções e conclusão (máx. 300 palavras).",
    agent=redator,
    context=[pesquisa],
    output_file="artigo.md",
)
```

| Parâmetro | Para que serve |
| :--- | :--- |
| `description` | O que fazer (aceita `{variáveis}`) |
| `expected_output` | **Formato** da entrega: o critério de "pronto" |
| `agent` | Quem executa |
| `context` | Tasks cuja saída entra como contexto desta |
| `output_file` | Salva o resultado em arquivo |
| `output_pydantic` | Força a saída num modelo Pydantic (saída estruturada) |
| `tools` | Tools extras só para esta task |

> `expected_output` é o parâmetro mais subestimado: é ele que faz a saída ser **previsível**.

---

## ✅ Resumo

- `Task` = `description` + `expected_output` + `agent`.
- `context=[...]` liga uma task à saída de outra.
- `output_file` e `output_pydantic` controlam onde e em que formato a saída sai.
