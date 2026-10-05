<h1 align="center">⚡ AI Chatbot Watson - Action parte 2</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_5-Desenvolvendo_ChatBots-111827?style=flat-square&logo=probot&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/IBM-Actions-111827?style=flat-square&logo=ibm&logoColor=white" />
</p>

<h2 align="left">📌 Várias actions convivendo</h2>

Um AI Chatbot real tem várias actions. O Watson decide qual executar comparando a mensagem com as frases de treino de todas elas.

| Action | Exemplos de frases |
| :--- | :--- |
| Fazer pedido | "quero pedir", "me vê uma pizza" |
| Status do pedido | "cadê meu pedido?", "meu pedido já saiu?" |
| Horário de funcionamento | "vocês abrem que horas?", "estão abertos?" |

---

## 🤷 Quando há dúvida

| Situação | Comportamento do Watson |
| :--- | :--- |
| Nenhuma action reconhecida | Executa **No action matches** |
| Duas actions parecidas | Pergunta ao usuário qual ele quis dizer (*clarification*) |
| Usuário muda de assunto no meio | Pode trocar de action (*digression*) e depois retomar |

```mermaid
flowchart TD
    A["💬 Mensagem"] --> B{"Confiança"}
    B -->|Alta em 1 action| C["⚡ Executa a action"]
    B -->|Empate| D["❔ 'Você quis dizer...?'"]
    B -->|Baixa| E["❓ No action matches"]
```

---

## ✅ Resumo

- O bot escolhe a action pela semelhança com as frases de treino.
- Ambiguidades geram pergunta de esclarecimento; baixa confiança cai em **No action matches**.
