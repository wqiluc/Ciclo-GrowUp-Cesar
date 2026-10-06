<h1 align="center">λ Deploy Rag - Função Lambda Handler</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AWS-Deploy_RAG-111827?style=flat-square&logo=amazonwebservices&logoColor=white" />
</p>

<h2 align="left">🚪 Ponto de entrada</h2>

A Lambda chama `lambda_handler(event, context)`. Vindo do **ALB**, o `event` traz o HTTP: `body` (string, às vezes base64), `headers`, `httpMethod`...

```python
def lambda_handler(event, context):
    body = event.get("body") or "{}"
    if (event.get("isBase64Encoded")):
        body = base64.b64decode(body).decode("utf-8")

    pergunta = json.loads(body).get("pergunta", "").strip()
    if not (pergunta):
        return resposta_http(400, {"erro": "Campo 'pergunta' é obrigatório"})
    return resposta_http(200, response(pergunta))
```

---

## 📤 Formato de retorno (ALB)

```python
{
    "statusCode": 200,
    "statusDescription": "200",
    "isBase64Encoded": False,
    "headers": {"Content-Type": "application/json"},
    "body": "{\"pergunta\": ..., \"resposta\": ...}",
}
```

> ⚠️ `body` precisa ser **string**, por isso o `json.dumps`.

---

## ▶️ Testar local

Simula o evento do ALB:

```bash
python "204-Deploy Rag - Função Lambda Handler.py"
```

---

## ✅ Resumo

- Handler = parse do HTTP → `response()` → HTTP de volta.
- No container, esse arquivo vira `app.py` (handler `app.lambda_handler`).
- Código: [204-...Lambda Handler.py](204-Deploy%20Rag%20-%20Função%20Lambda%20Handler.py)
