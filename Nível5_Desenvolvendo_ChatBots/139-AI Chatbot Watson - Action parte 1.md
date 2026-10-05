<h1 align="center">⚡ AI Chatbot Watson - Action parte 1</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_5-Desenvolvendo_ChatBots-111827?style=flat-square&logo=probot&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/IBM-Actions-111827?style=flat-square&logo=ibm&logoColor=white" />
</p>

<h2 align="left">📌 Criando a primeira action com IA</h2>

1. Em **Actions**, clicar em **New action** → **Start from scratch**.
2. Dar um nome à action (ex.: *Fazer pedido*).
3. Em **Customer starts with**, cadastrar várias frases de exemplo.

---

## 🗣️ Frases de treino

Quanto mais variadas, melhor o Watson reconhece a intenção:

```text
quero fazer um pedido
gostaria de pedir uma pizza
me vê uma pizza
dá pra pedir delivery?
quero encomendar
```

| Boa prática | Por quê |
| :--- | :--- |
| Usar sinônimos e variações | O modelo generaliza melhor |
| Incluir frases curtas e longas | Usuários escrevem de formas diferentes |
| Evitar frases iguais entre actions | Gera conflito na hora de decidir a action |

---

## 🧪 Testando o reconhecimento

No **Preview**, digitar frases **que não estão** na lista (ex.: "tô com fome, quero pizza") e verificar se a action correta é disparada.

---

## ✅ Resumo

- Uma action de IA começa pelas frases de **Customer starts with**.
- Frases variadas e sem sobreposição entre actions melhoram a precisão.
