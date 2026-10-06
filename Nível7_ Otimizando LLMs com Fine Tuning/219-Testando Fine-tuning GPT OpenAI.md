<h1 align="center">🧪 Testando Fine-tuning GPT OpenAI</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_7-Otimizando_LLMs_com_Fine_Tuning-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Fine_Tuning-Avaliação-111827?style=flat-square&logo=openai&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Comparar o **modelo base** (`gpt-4o-mini`) com o **modelo fine-tunado** nos tweets do `test.jsonl`, que nenhum dos dois viu no treino.

---

## 📦 Setup

```bash
pip install openai python-dotenv scikit-learn
```

Pré-requisitos: `data/test.jsonl` (aula 217) e `data/fine_tuned_model.txt` (aula 218).

---

## 🎲 Amostra do teste

```python
with open(DATA_DIR / "test.jsonl", encoding="utf-8") as f:
    test_data = [json.loads(line) for line in f]

random.seed(42)
amostra = random.sample(test_data, N_AMOSTRAS)  # 200 de 1.134
```

Cada exemplo é uma chamada de API **por modelo**. Uma amostra de 200 já dá uma boa ideia e reduz custo e tempo. Se quiser o teste completo, use `N_AMOSTRAS = len(test_data)`.

---

## 🤖 Classificando

```python
def classificar(model: str, exemplo: dict) -> str:
    resposta = client.chat.completions.create(
        model=model,
        messages=exemplo["messages"][:2],
        temperature=0,
        max_tokens=5,
    )
    return resposta.choices[0].message.content.strip().lower()
```

| Detalhe | Por quê |
| :--- | :--- |
| `messages[:2]` | Envia só `system` + `user`; o `assistant` é o gabarito |
| `temperature=0` | Resposta determinística, sem criatividade |
| `max_tokens=5` | `hate` / `no-hate` são curtos; corta respostas longas |
| `.strip().lower()` | Normaliza para comparar com o rótulo |

> O modelo fine-tunado é chamado **igual a qualquer outro**: basta trocar o `model` pelo nome `ft:...`.

---

## 📊 Métricas

```python
y_true = [ex["messages"][2]["content"] for ex in amostra]

for model in (BASE_MODEL, FINE_TUNED_MODEL):
    y_pred = [classificar(model, ex) for ex in amostra]
    print(f"Acurácia: {accuracy_score(y_true, y_pred):.3f}")
    print(classification_report(y_true, y_pred, labels=["no-hate", "hate"], zero_division=0))
```

| Métrica | O que mede |
| :--- | :--- |
| **Acurácia** | % de acertos no geral |
| **Precision** (`hate`) | Dos tweets marcados como `hate`, quantos eram mesmo |
| **Recall** (`hate`) | Dos tweets `hate` de verdade, quantos o modelo pegou |
| **F1** | Média harmônica de precision e recall |

> Com ~68% de `no-hate`, a acurácia sozinha engana: um modelo que sempre responde `no-hate` já tem ~0,68. Olhe principalmente o **recall e o F1 de `hate`**.

O que esperar:
- **Base:** às vezes foge do formato (ex.: `"não é discurso de ódio"`). Toda resposta fora do formato conta como erro.
- **Fine-tunado:** responde sempre `hate`/`no-hate` e segue o critério dos anotadores do dataset.

---

## ✍️ Teste manual

```python
tweet = "bom dia a todos, ótima semana!"
exemplo = {"messages": [amostra[0]["messages"][0], {"role": "user", "content": tweet}]}
print(tweet, "→", classificar(FINE_TUNED_MODEL, exemplo))
```

---

## ✅ Resumo

- A avaliação usa o `test.jsonl`, com tweets que o modelo nunca viu.
- O modelo `ft:...` é chamado como qualquer modelo no `chat.completions`.
- Compare base x fine-tunado com **acurácia** e com o **F1/recall** da classe `hate`.
- Fine-tuning ensina **formato e critério** de classificação que um prompt sozinho não garante.
