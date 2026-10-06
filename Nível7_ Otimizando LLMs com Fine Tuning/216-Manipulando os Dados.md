<h1 align="center">🛠️ Manipulando os Dados</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_7-Otimizando_LLMs_com_Fine_Tuning-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Fine_Tuning-Manipulando_os_Dados-111827?style=flat-square&logo=huggingface&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Transformar cada linha do DataFrame (`text`, `label`) num exemplo no **formato chat** da OpenAI (`messages` com `system`, `user` e `assistant`), visto na aula 213.

---

## 🧹 Limpando o texto

```python
df["text"] = df["text"].str.split().str.join(" ")
```

Os tweets têm `\n` e espaços repetidos. `split()` sem argumento quebra em **qualquer** espaço em branco, e `join(" ")` junta com um espaço só. Na prática isso só economiza tokens, porque o conteúdo do texto não muda.

---

## 🧾 System prompt

```python
SYSTEM_PROMPT = (
    "Você é um classificador de discurso de ódio em tweets em português. "
    "Responda apenas com 'hate' ou 'no-hate'."
)
```

O mesmo `system` vai em **todos** os exemplos de treino. Depois do fine-tuning, o modelo deve ser chamado com esse mesmo prompt.

---

## 🔁 Linha → `messages`

```python
def to_messages(text: str, label: str) -> dict:
    return {
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": text},
            {"role": "assistant", "content": label},
        ]
    }


train_data = [to_messages(row.text, row.label) for row in train_df.itertuples()]
test_data = [to_messages(row.text, row.label) for row in test_df.itertuples()]
```

| role | Vem de |
| :--- | :--- |
| `system` | `SYSTEM_PROMPT` (fixo) |
| `user` | coluna `text` (o tweet) |
| `assistant` | coluna `label` (a **resposta ideal**) |

> `itertuples()` percorre o DataFrame devolvendo cada linha como uma tupla nomeada (`row.text`, `row.label`), e é bem mais rápido que `iterrows()`.

---

## 👀 Exemplo gerado

```json
{
  "messages": [
    {
      "role": "system",
      "content": "Você é um classificador de discurso de ódio em tweets em português. Responda apenas com 'hate' ou 'no-hate'."
    },
    {
      "role": "user",
      "content": "To me achando tão feia e gorda que fico feliz que o crush não me chamou pra sair essa semana."
    },
    {
      "role": "assistant",
      "content": "no-hate"
    }
  ]
}
```

---

## ✅ Resumo

- Texto normalizado com `split()` + `join(" ")` para não gastar tokens com espaços.
- Um `SYSTEM_PROMPT` fixo define a tarefa e o formato da resposta.
- Cada linha vira um dict `messages` (system → user → assistant).
- Resultado: **4.536** exemplos de treino e **1.134** de teste.
