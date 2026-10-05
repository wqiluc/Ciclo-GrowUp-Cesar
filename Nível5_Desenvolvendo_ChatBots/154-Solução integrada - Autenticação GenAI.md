<h1 align="center">🔑 Solução integrada - Autenticação GenAI</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_5-Desenvolvendo_ChatBots-111827?style=flat-square&logo=probot&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/IBM-Watson_+_OpenAI-111827?style=flat-square&logo=ibm&logoColor=white" />
</p>

<h2 align="left">📄 Registrando a extension</h2>

1. Baixar o `openai-openapi.json` do starter kit.
2. No Watson: **Integrations → Build custom extension**.
3. Dar nome (ex.: `OpenAI`) e **importar** o JSON.
4. Conferir os endpoints listados (ex.: `POST /chat/completions`).
5. **Finish** → a extension aparece em *Extensions*.

---

## 🔐 Autenticação

Em **Extensions → OpenAI → Add → Authentication**:

| Campo | Valor |
| :--- | :--- |
| Authentication type | **Bearer auth** |
| Token | `sk-...` (chave da OpenAI) |
| Server | `https://api.openai.com/v1` |

Equivale a esta chamada:

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-4o-mini", "messages": [{"role": "user", "content": "Olá"}]}'
```

> ⚠️ A chave fica guardada no Watson — nunca dentro de uma resposta ou variável visível ao usuário.

---

## ✅ Resumo

- A spec OpenAPI define **o que** chamar; a autenticação define **com que permissão**.
- OpenAI usa **Bearer token** no header `Authorization`.