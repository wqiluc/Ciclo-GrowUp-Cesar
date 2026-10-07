<h1 align="center">🧰 Técnicas de Prompt Engineering</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_9-Prompt_Engineering-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Tema-Técnicas-111827?style=flat-square" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Conhecer as principais técnicas para estruturar um prompt.

---

## 🧱 Anatomia de um bom prompt

| Parte | Pergunta que responde | Exemplo |
| :--- | :--- | :--- |
| **Papel (persona)** | Quem o modelo deve ser? | "Você é um treinador de tênis" |
| **Tarefa** | O que fazer? | "Compare o saque pinpoint e o plataforma" |
| **Contexto** | Para quem / por quê? | "Sou iniciante, jogo 2x por semana" |
| **Restrições** | O que evitar / limites? | "Máximo 150 palavras, sem jargão" |
| **Formato** | Como entregar? | "Tabela com prós e contras" |

---

## 🛠️ Técnicas

| Técnica | Ideia | Quando usar |
| :--- | :--- | :--- |
| **Zero-shot** | Só a instrução, sem exemplos | Tarefas simples |
| **Few-shot** | Dar 2–3 exemplos de entrada → saída | Padronizar formato / tom |
| **Chain of Thought** | Pedir para "pensar passo a passo" | Raciocínio, contas, lógica |
| **Persona / Role** | Definir um papel | Ajustar profundidade e vocabulário |
| **Delimitadores** | Separar dados com `"""`, `###`, tags | Evitar que o texto se misture com a instrução |
| **Saída estruturada** | Pedir JSON / tabela / lista | Usar a resposta em código |
| **Iteração** | Refinar com base na resposta | Sempre |

---

## 💡 Exemplo few-shot

```text
Classifique o sentimento.

Texto: "Adorei o produto" -> positivo
Texto: "Chegou quebrado" -> negativo
Texto: "Entrega no prazo, nada demais" ->
```

---

## ✅ Resumo

- Papel + tarefa + contexto + restrições + formato.
- Exemplos (few-shot) ensinam o padrão melhor que explicações longas.
- "Passo a passo" melhora raciocínio; delimitadores evitam confusão.