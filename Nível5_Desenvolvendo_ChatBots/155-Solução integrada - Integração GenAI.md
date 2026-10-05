<h1 align="center">🔗 Solução integrada - Integração GenAI</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_5-Desenvolvendo_ChatBots-111827?style=flat-square&logo=probot&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/IBM-Watson_+_OpenAI-111827?style=flat-square&logo=ibm&logoColor=white" />
</p>

<h2 align="left">⚙️ Chamando o GPT numa action</h2>

Na action **No action matches** (ou numa action criada para isso):

1. **New step** → *And then* → **Use an extension**.
2. Extension: `OpenAI` · Operation: `Create chat completion`.
3. Parâmetros:

| Parâmetro | Valor |
| :--- | :--- |
| `model` | `gpt-4o-mini` |
| `messages[0].role` | `system` |
| `messages[0].content` | `Você é um atendente de pizzaria...` |
| `messages[1].role` | `user` |
| `messages[1].content` | variável **input.text** (o que o usuário digitou) |

4. Próximo step → resposta com a variável da extension:

```text
${step_xxx_result_1.body.choices[0].message.content}
```

---

## 🔄 Fluxo

```mermaid
sequenceDiagram
    participant U as 👤 Usuário
    participant W as 🤖 Watson
    participant O as 🧠 OpenAI
    U->>W: "Qual pizza combina com vinho?"
    W->>W: nenhuma action reconhecida
    W->>O: POST /chat/completions
    O-->>W: choices[0].message.content
    W-->>U: resposta gerada
```

---

## ✅ Resumo

- **Use an extension** chama a OpenAI de dentro de um step.
- A resposta é lida em `body.choices[0].message.content`.