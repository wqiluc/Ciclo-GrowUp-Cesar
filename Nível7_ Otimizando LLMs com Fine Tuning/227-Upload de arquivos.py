# Rodar no Google Colab
import json

from google.colab import files

uploaded = files.upload()  # selecionar data/train.jsonl e data/test.jsonl (gerados na aula 217)

for name in ("train.jsonl", "test.jsonl"):
    with open(name, encoding="utf-8") as f:
        lines = [json.loads(line) for line in f]
    print(f"{name}: {len(lines)} exemplos")
