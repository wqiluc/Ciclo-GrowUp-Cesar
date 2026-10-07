<h1 align="center">🎨 Art Director Agent</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AutoGen_Studio-Art_Director-111827?style=flat-square&logo=microsoft&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Criar o agente que **pensa** a arte: entende o pedido e escreve um **prompt de imagem** detalhado para o executor.

---

## 🎨 Configuração no Studio

Em **Agents → New Agent → AssistantAgent**:

| Campo | Valor |
| :--- | :--- |
| Name | `art_director` |
| Description | Diretor de arte que define o conceito visual e escreve o prompt da imagem |
| Model | `gpt-4o-mini` (aula 251) |
| Skills / Tools | **nenhuma** |

**System message:**

```text
Você é um diretor de arte. A partir do pedido do usuário, defina:
- conceito e mensagem da peça;
- estilo visual, paleta de cores, composição e iluminação;
- um PROMPT de imagem em inglês, detalhado e objetivo.
Não gere imagens. Entregue o prompt para o art_executor.
Quando a imagem for gerada e estiver de acordo com o conceito, responda APROVADO.
```

---

## 🧠 Por que separar diretor e executor?

- O diretor foca em **criatividade e coerência** com o pedido.
- O executor foca em **chamar a tool certa** com o prompt certo.
- O diretor **revisa** o resultado: se não ficou bom, pede uma nova versão.

---

## ✅ Resumo

- `art_director` = AssistantAgent sem tools, só planejamento.
- O system message define o formato da entrega (conceito + prompt).
- Ele também é o "aprovador": responde `APROVADO` para encerrar o workflow.
