<h1 align="center">📎 Contextualizando LLMs - Utilizando LLMs com contexto</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Técnica-Prompt_com_contexto-111827?style=flat-square" />
</p>

<h2 align="left">📌 Colocar a informação dentro do prompt</h2>

Se o modelo não conhece o dado, basta **enviá-lo junto com a pergunta**. O LLM passa a responder com base no texto fornecido (*in-context learning*).

```mermaid
flowchart LR
    D["📄 Texto do documento"] --> P["📝 Prompt = contexto + pergunta"]
    Q["❓ Pergunta"] --> P
    P --> L["🧠 LLM"] --> R["✅ Resposta baseada no contexto"]
```

---

## 🧩 Exemplo de prompt

```text
Responda APENAS com base no contexto abaixo.
Se a resposta não estiver no contexto, diga "não encontrei no documento".

Contexto:
"""
Política de reembolso: o cliente pode solicitar reembolso em até 7 dias corridos
após a compra, mediante apresentação da nota fiscal.
"""

Pergunta: Qual o prazo de reembolso?
```

Resposta esperada: **7 dias corridos, com nota fiscal** — sem alucinação.

| Vantagem | Por quê |
| :--- | :--- |
| Dados atualizados/privados | O contexto vem de fora do modelo |
| Menos alucinação | Instrução limita a resposta ao texto |
| Sem re-treinar | Não precisa de fine-tuning |

---

## ✅ Resumo

- Dar **contexto no prompt** resolve a falta de conhecimento do LLM.
- A instrução "responda só com base no contexto" reduz alucinação.
- Funciona bem… enquanto o contexto é **pequeno** → próxima aula.
