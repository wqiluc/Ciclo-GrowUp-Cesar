<h1 align="center">💾 Finalizando Dataset</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_7-Otimizando_LLMs_com_Fine_Tuning-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Fine_Tuning-Finalizando_Dataset-111827?style=flat-square&logo=huggingface&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Salvar os exemplos em arquivos **`.jsonl`** (`train.jsonl` e `test.jsonl`) e conferir se o formato está correto antes de enviar para a OpenAI.

---

## 💾 Salvando em JSONL

```python
import json
from pathlib import Path

OUTPUT_DIR = Path(__file__).parent / "data"


def save_jsonl(df, path: Path) -> None:
    with open(path, "w", encoding="utf-8") as f:
        for row in df.itertuples():
            f.write(json.dumps(to_messages(row.text, row.label), ensure_ascii=False) + "\n")


OUTPUT_DIR.mkdir(exist_ok=True)
save_jsonl(train_df, OUTPUT_DIR / "train.jsonl")
save_jsonl(test_df, OUTPUT_DIR / "test.jsonl")
```

| Detalhe | Por quê |
| :--- | :--- |
| `json.dumps(...) + "\n"` | JSONL = **um objeto JSON por linha** |
| `ensure_ascii=False` | Mantém `ó`, `ç`, `ã` legíveis em vez de `ó` |
| `encoding="utf-8"` | Necessário para gravar os acentos |
| `Path(__file__).parent` | Salva em `data/` ao lado do script, de onde quer que ele seja rodado |

---

## 📄 Como fica o arquivo

```jsonl
{"messages": [{"role": "system", "content": "Você é um classificador de discurso de ódio em tweets em português. Responda apenas com 'hate' ou 'no-hate'."}, {"role": "user", "content": "To me achando tão feia e gorda que fico feliz que o crush não me chamou pra sair essa semana."}, {"role": "assistant", "content": "no-hate"}]}
{"messages": [...]}
```

---

## ✔️ Validando

```python
for name in ("train.jsonl", "test.jsonl"):
    with open(OUTPUT_DIR / name, encoding="utf-8") as f:
        lines = [json.loads(line) for line in f]
    assert all([m["role"] for m in ex["messages"]] == ["system", "user", "assistant"] for ex in lines)
    print(f"{name}: {len(lines)} exemplos OK")
```

```
train.jsonl: 4536 exemplos OK
test.jsonl: 1134 exemplos OK
```

Se alguma linha não for JSON válido, `json.loads` quebra. Se alguma linha fugir da ordem system → user → assistant, o `assert` falha. É melhor descobrir isso aqui do que no upload para a OpenAI.

| Arquivo | Exemplos | Tamanho |
| :--- | :---: | :---: |
| `data/train.jsonl` | 4.536 | ~1,5 MB |
| `data/test.jsonl` | 1.134 | ~390 KB |

---

## ✅ Resumo

- Pipeline completo: carregar → limpar → split → `messages` → **JSONL**.
- `train.jsonl` vai para o fine-tuning; `test.jsonl` fica para avaliar o modelo.
- Validar o arquivo localmente evita erro no upload para a OpenAI.
