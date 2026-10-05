<h1 align="center">🪜 AI Chatbot Watson - Steps parte 1</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_5-Desenvolvendo_ChatBots-111827?style=flat-square&logo=probot&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/IBM-Steps-111827?style=flat-square&logo=ibm&logoColor=white" />
</p>

<h2 align="left">📌 Coletando informações</h2>

Depois que a action é reconhecida, os **Steps** conduzem a conversa e coletam os dados necessários.

Exemplo — action *Fazer pedido*:

| Step | Assistant says | Customer response |
| :--- | :--- | :--- |
| 1 | Qual sabor você deseja? | Options (Calabresa, Margherita, Frango) |
| 2 | Qual o tamanho? | Options (P, M, G) |
| 3 | Quantas unidades? | Number |
| 4 | Confirma o pedido? | Confirmation |

---

## 🧠 Pulando steps já respondidos

Se o usuário escreve "quero uma pizza **grande** de **calabresa**", o Watson já preenche os steps de sabor e tamanho e **não pergunta de novo** — esse é o ganho de um AI Chatbot sobre o Menu-Based.

---

## 🔁 Usando respostas anteriores

No texto do **Assistant says**, é possível inserir o valor de steps anteriores (botão **`$`** / *Insert a variable*):

```text
Perfeito! Uma pizza ${Step 2} de ${Step 1}. Confirma?
```

---

## ✅ Resumo

- Steps coletam dados com o tipo de resposta adequado (Options, Number, Confirmation…).
- O Watson preenche automaticamente steps que o usuário já respondeu na frase inicial.
- Respostas anteriores podem ser reutilizadas nas mensagens do bot.
