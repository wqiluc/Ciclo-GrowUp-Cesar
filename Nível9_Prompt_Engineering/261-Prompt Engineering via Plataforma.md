<h1 align="center">🧪 Prompt Engineering via Plataforma</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_9-Prompt_Engineering-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/OpenAI-Playground_/_API-111827?style=flat-square&logo=openai&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Usar a **plataforma da OpenAI** (Playground / API) para controlar o prompt de sistema e os parâmetros do modelo.

---

## 🆚 Chat x Plataforma

| | Chat (ChatGPT) | Plataforma (Playground / API) |
| :--- | :--- | :--- |
| **Público** | Usuário final | Desenvolvedor |
| **System prompt** | Escondido / instruções personalizadas | Totalmente editável |
| **Parâmetros** | Não expostos | `temperature`, `max_tokens`, `top_p`... |
| **Uso** | Conversa | Testar prompts antes de levar ao código |
| **Custo** | Assinatura | Por token |

---

## 🧱 Papéis das mensagens

| Role | Função |
| :--- | :--- |
| `system` | Regras fixas: persona, tom, formato, limites |
| `user` | Pedido do usuário |
| `assistant` | Respostas do modelo (ou exemplos few-shot) |

---

## 🎛️ Parâmetros

| Parâmetro | Efeito |
| :--- | :--- |
| `temperature` | 0 = previsível / factual · ~1 = criativo / variado |
| `max_tokens` | Limite de tamanho da resposta |
| `top_p` | Outra forma de controlar a variedade (mexa nele **ou** na temperatura) |
| `response_format` | Forçar saída em JSON |

---

## 💻 Do Playground para o código

Ver [261-Prompt Engineering via Plataforma.py](./261-Prompt%20Engineering%20via%20Plataforma.py): o mesmo prompt de sistema + few-shot, rodado com temperaturas diferentes.

```bash
pip install openai python-dotenv
python "261-Prompt Engineering via Plataforma.py"
```

---

## ✅ Resumo

- A plataforma expõe o **system prompt** e os **parâmetros**.
- Teste no Playground, depois copie a configuração para a API.
- `temperature` baixa para tarefas objetivas, alta para criatividade.