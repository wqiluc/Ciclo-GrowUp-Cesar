<h1 align="center">🚢 Introdução ao CrewAI</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/CrewAI-Introdução-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Conhecer os 4 conceitos centrais do **CrewAI** e preparar o ambiente.

---

## 🧱 Conceitos

```mermaid
flowchart LR
    A["🧑 Agent<br/>quem faz"] --> T["📋 Task<br/>o que faz"]
    Tl["🛠️ Tool<br/>com o quê"] --> A
    T --> C["🚢 Crew<br/>equipe + processo"]
    C --> K["▶️ kickoff()"]
```

| Conceito | Papel | Analogia |
| :--- | :--- | :--- |
| **Agent** | Membro da equipe com `role`, `goal` e `backstory` | Funcionário |
| **Task** | Trabalho com `description` e `expected_output`, atribuído a um agente | Demanda / ticket |
| **Tool** | Função que o agente pode chamar | Ferramenta de trabalho |
| **Crew** | Junta agentes + tasks e define o **processo** | Equipe / projeto |

---

## ⚙️ Setup

```bash
python -m venv .venv && source .venv/bin/activate
pip install crewai crewai-tools python-dotenv
```

`.env` (já está no `.gitignore` da raiz):

```env
OPENAI_API_KEY=sk-...
```

> O CrewAI usa a OpenAI por padrão, mas aceita outros provedores (Anthropic, Gemini, Ollama...) via `LLM(model="provedor/modelo")`.

---

## 🔄 Processos

| Processo | Como executa |
| :--- | :--- |
| `Process.sequential` | Tasks na ordem da lista; a saída de uma vira contexto da próxima |
| `Process.hierarchical` | Um **manager** (LLM) delega as tasks aos agentes e valida o resultado |

---

## ✅ Resumo

- CrewAI organiza agentes como uma **equipe**: Agent, Task, Tool e Crew.
- Instalação: `pip install crewai crewai-tools`, chave da OpenAI no `.env`.
- Processo **sequencial** (padrão) ou **hierárquico** (com gerente).
