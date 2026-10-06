<h1 align="center">λ Deploy Rag - Lambda Function</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AWS-Deploy_RAG-111827?style=flat-square&logo=amazonwebservices&logoColor=white" />
</p>

<h2 align="left">🖱️ Pelo console</h2>

**Lambda → Create function → Container image**

| Campo | Valor |
| :--- | :--- |
| Function name | `deploy-rag` |
| Container image URI | `$ECR_URI/deploy-rag:latest` (Browse images) |
| Architecture | `x86_64` |

Depois, em **Configuration**:

| Config | Valor | Por quê |
| :--- | :--- | :--- |
| Timeout | 1–3 min | Cold start indexa o PDF + chamada ao LLM |
| Memory | 1024–2048 MB | LangChain + Chroma em memória |
| Environment variables | `OPENAI_API_KEY` | Fora da imagem |

---

## ⌨️ Pelo CLI

```bash
aws lambda create-function \
  --function-name deploy-rag \
  --package-type Image \
  --code ImageUri=$ECR_URI/deploy-rag:latest \
  --role arn:aws:iam::$AWS_ACCOUNT_ID:role/lambda-basic-execution \
  --timeout 180 --memory-size 2048 \
  --environment "Variables={OPENAI_API_KEY=sk-...}"
```

Atualizar após novo push:

```bash
aws lambda update-function-code --function-name deploy-rag --image-uri $ECR_URI/deploy-rag:latest
```

---

## 🧪 Testar

Aba **Test** com o evento:

```json
{ "body": "{\"pergunta\": \"Qual é o tema principal do documento?\"}", "isBase64Encoded": false }
```

> 💡 Default de timeout é **3 s**: sem aumentar, o cold start estoura.

---

## ✅ Resumo

- Lambda criada a partir da imagem do ECR, com timeout/memória ajustados e a API key como env var.
