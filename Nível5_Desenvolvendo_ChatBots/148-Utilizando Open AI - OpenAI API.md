<h1 align="center">🔌 Utilizando OpenAI - OpenAI API</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_5-Desenvolvendo_ChatBots-111827?style=flat-square&logo=probot&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-OpenAI_API-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">⚙️ Ambiente</h2>

```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install openai streamlit
export OPENAI_API_KEY="sk-..."   # Windows: set OPENAI_API_KEY=sk-...
```

---

## 💬 Primeira chamada

```python
from openai import OpenAI

client = OpenAI()  # lê OPENAI_API_KEY do ambiente

resposta = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "Você é um atendente de pizzaria, educado e direto."},
        {"role": "user", "content": "Quais sabores vocês têm?"},
    ],
    temperature=0.7,
)

print(resposta.choices[0].message.content)
```

| Parâmetro | Função |
| :--- | :--- |
| `model` | Qual LLM usar |
| `messages` | Lista de mensagens com `role` + `content` |
| `temperature` | Criatividade da resposta |
| `max_tokens` | Limite de tamanho da resposta |

---

## 🔁 Memória da conversa

A API **não guarda estado**: a cada chamada é preciso reenviar o histórico.

```python
historico = [{"role": "system", "content": "Você é um atendente de pizzaria."}]

while True:
    pergunta = input("Você: ")
    historico.append({"role": "user", "content": pergunta})

    resposta = client.chat.completions.create(model="gpt-4o-mini", messages=historico)
    texto = resposta.choices[0].message.content

    historico.append({"role": "assistant", "content": texto})
    print("Bot:", texto)
```

> 💡 Nas próximas aulas esse mesmo loop vira uma interface web com **Streamlit**.

---

## ✅ Resumo

- `client.chat.completions.create` recebe `model` + `messages`.
- O histórico (`system` → `user` → `assistant` …) é responsabilidade do app.
- A chave fica em variável de ambiente, nunca no código.
