<h1 align="center">👥 Multi-agentes de IA</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Tema-Multi--agentes-111827?style=flat-square" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Entender por que dividir um problema entre **vários agentes especializados** funciona melhor que um único agente "faz-tudo".

---

## 🏢 A analogia da empresa

Uma empresa não tem um funcionário que faz tudo: tem gerente, analistas, redator... Cada um é bom em uma coisa e entrega para o próximo.

**Sistemas multi-agentes** seguem a mesma lógica:

| Agente único | Multi-agentes |
| :--- | :--- |
| Prompt enorme, com muitas instruções | Prompts curtos e focados por agente |
| Muitas tools → o LLM se confunde na escolha | Cada agente só vê as tools dele |
| Difícil saber onde errou | Cada etapa tem uma saída que dá para inspecionar |
| Difícil de reaproveitar | Agentes reutilizáveis em outros fluxos |

---

## 🔀 Formas de colaboração

```mermaid
flowchart TB
    subgraph S["Sequencial"]
        direction LR
        A1["Agente A"] --> A2["Agente B"] --> A3["Agente C"]
    end
    subgraph H["Hierárquico"]
        direction TB
        M["🧑‍💼 Gerente"] --> B1["Agente A"]
        M --> B2["Agente B"]
    end
    subgraph G["Group Chat"]
        direction LR
        C1["Agente A"] <--> C2["Agente B"]
        C2 <--> C3["Agente C"]
        C1 <--> C3
    end
```

| Padrão | Como funciona | Onde aparece no curso |
| :--- | :--- | :--- |
| **Sequencial** | A saída de um vira entrada do próximo | Crew de análise de ações (CrewAI) |
| **Hierárquico** | Um gerente delega e revisa | `Process.hierarchical` do CrewAI |
| **Group Chat** | Agentes conversam e um seletor decide quem fala | Workflow do AutoGen Studio |

---

## ⚠️ Cuidados

- Mais agentes = **mais chamadas ao LLM** = mais custo e latência.
- Agentes podem entrar em **loop** conversando entre si: sempre ter um limite de iterações/mensagens.
- Só dividir quando as etapas forem **realmente diferentes**.

---

## ✅ Resumo

- Multi-agentes = vários agentes especializados colaborando, como uma equipe.
- Prompts e tools focados deixam cada agente mais preciso e o fluxo mais fácil de depurar.
- Padrões principais: **sequencial**, **hierárquico** e **group chat**.
