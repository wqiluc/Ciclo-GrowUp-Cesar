<h1 align="center">💬 Prompt Engineering via Chat</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_9-Prompt_Engineering-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/ChatGPT-Chat-111827?style=flat-square&logo=openai&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Aplicar as técnicas na interface de chat (ChatGPT) e ver a diferença entre um prompt vago e um estruturado.

---

## 🔁 Do vago ao estruturado

**Versão 1 (vaga):**

```text
Qual o melhor saque no tênis?
```

→ Resposta genérica, longa, sem considerar o nível do jogador.

**Versão 2 (estruturada):**

```text
Você é um treinador de tênis experiente.
Sou iniciante, jogo 2x por semana e quero mais consistência no saque.

Compare o saque pinpoint e o saque plataforma.
Responda em uma tabela (prós, contras, indicado para) e
termine com uma recomendação de 2 frases para o meu caso.
```

→ Resposta curta, comparativa e personalizada.

---

## 🧠 Recursos do chat que ajudam

| Recurso | Para quê |
| :--- | :--- |
| **Histórico da conversa** | Refinar: "agora resuma em 3 tópicos", "mais simples" |
| **Instruções personalizadas** | Contexto fixo (quem você é, como quer as respostas) |
| **GPTs / Projetos** | Prompt de sistema salvo para uma tarefa recorrente |
| **Anexos** | Passar o material como contexto (PDF, planilha, imagem) |

---

## ⚠️ Cuidados

- Conversa longa demais "contamina" o contexto: abra um chat novo ao mudar de assunto.
- Confira fatos: o modelo pode **alucinar** com muita confiança.
- Não cole dados sensíveis.

---

## ✅ Resumo

- No chat, a iteração é natural: pergunte, avalie, refine.
- Persona + contexto + formato transformam uma resposta genérica em útil.
- Instruções personalizadas evitam repetir contexto a cada conversa.