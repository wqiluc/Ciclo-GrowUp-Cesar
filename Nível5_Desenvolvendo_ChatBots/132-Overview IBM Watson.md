<h1 align="center">🧭 Overview IBM Watson</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_5-Desenvolvendo_ChatBots-111827?style=flat-square&logo=probot&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/IBM-Watson_Assistant-111827?style=flat-square&logo=ibm&logoColor=white" />
</p>

<h2 align="left">📌 Criando o primeiro assistente</h2>

Ao abrir o Watson Assistant pela primeira vez, ele pede para criar um **assistente**:

| Campo | Descrição |
| :--- | :--- |
| Nome | Nome do chatbot |
| Idioma | Idioma das conversas (ex.: Português - Brasil) |
| Descrição | Opcional |

Em seguida, ele pergunta onde o bot será usado (site, telefone, etc.) e permite personalizar a aparência do *web chat*.

---

## 🗂️ Menu lateral

| Seção | Para que serve |
| :--- | :--- |
| **Home** | Visão geral e atalhos do assistente |
| **Actions** | Onde as conversas são construídas (fluxos do bot) |
| **Preview** | Testar o bot como se fosse o usuário final |
| **Publish** | Gerar versões do conteúdo e publicar |
| **Environments** | Ambientes **Draft** (rascunho) e **Live** (produção) |
| **Integrations** | Canais: web chat, telefone, WhatsApp, Slack, etc. |
| **Analyze** | Métricas e histórico de conversas |

```mermaid
flowchart LR
    A["✏️ Actions"] --> B["👀 Preview"] --> C["📦 Publish"] --> D["🌐 Live / Integrations"]
```

---

## ✅ Resumo

- Cada bot no Watson é um **assistente**, com nome e idioma próprios.
- O trabalho principal acontece em **Actions**; o **Preview** permite testar sem publicar.
- **Environments** separa rascunho de produção, e **Integrations** conecta o bot aos canais.
