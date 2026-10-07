<h1 align="center">⚙️ Config do modelo e Workflow</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AutoGen_Studio-Model_e_Workflow-111827?style=flat-square&logo=microsoft&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Cadastrar o **modelo** no AutoGen Studio e criar o **workflow** que vai receber os agentes de arte.

---

## 🧠 Configurando o modelo

Em **Models → New Model**:

| Campo | Valor |
| :--- | :--- |
| Model | `gpt-4o-mini` (ou `gpt-4o`) |
| API Key | `sk-...` (ou deixar vazio se `OPENAI_API_KEY` já está no ambiente) |
| Base URL | vazio para OpenAI; preencher para Azure / Ollama / outros compatíveis |

Usar **Test Model** antes de seguir: se falhar aqui, nenhum agente funciona.

Equivalente em código (AutoGen 0.4+):

```python
from autogen_ext.models.openai import OpenAIChatCompletionClient

model_client = OpenAIChatCompletionClient(model="gpt-4o-mini")
```

---

## 🔀 Criando o Workflow

Em **Workflows → New Workflow**:

| Tipo | Como funciona |
| :--- | :--- |
| **Autonomous (Chat)** | Um *sender* (UserProxy) conversa com um *receiver* (um agente ou um Group Chat) |
| **Sequential** | Agentes executam em ordem fixa, um passa para o outro |

Para o projeto: **Autonomous** com *sender* = `user_proxy` e *receiver* = **Group Chat** (aula 252).

> Nas versões 0.4+ isso vira um **Team** (`RoundRobinGroupChat` ou `SelectorGroupChat`) com uma **condição de término**.

---

## ✅ Resumo

- O modelo é cadastrado uma vez e reutilizado por todos os agentes.
- Workflow = como os agentes conversam (sender → receiver).
- No projeto: UserProxy envia o pedido para um Group Chat com os agentes de arte.
