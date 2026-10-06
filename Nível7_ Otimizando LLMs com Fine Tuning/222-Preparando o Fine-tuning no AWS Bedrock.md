<h1 align="center">⚙️ Preparando o Fine-tuning no AWS Bedrock</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_7-Otimizando_LLMs_com_Fine_Tuning-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AWS-Bedrock-111827?style=flat-square&logo=amazonwebservices&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Fazer fine-tuning do **Amazon Nova Lite** com o mesmo dataset de tweets da aula 217: converter o `.jsonl`, subir para o **S3** e criar o **customization job**.

---

## 📦 Setup

```bash
pip install boto3 python-dotenv
```

```env
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_DEFAULT_REGION=us-east-1
S3_BUCKET=meu-bucket-fine-tuning
BEDROCK_ROLE_ARN=arn:aws:iam::<conta>:role/BedrockFineTuningRole
```

| Recurso | Para quê |
| :--- | :--- |
| **Bucket S3** (mesma região) | Guardar o dataset e a saída do job |
| **IAM Role** | O Bedrock assume essa role para ler/escrever no bucket |

A role precisa de uma *trust policy* para `bedrock.amazonaws.com` e permissão `s3:GetObject`, `s3:PutObject` e `s3:ListBucket` no bucket. O jeito mais fácil: criar o primeiro job pelo console (**Custom models → Create fine-tuning job**) e deixar o Bedrock gerar a role.

---

## 🔄 Convertendo o formato

O Nova usa o esquema `bedrock-conversation-2024`, diferente do formato da OpenAI:

```python
def to_bedrock(exemplo: dict) -> dict:
    system, user, assistant = exemplo["messages"]
    return {
        "schemaVersion": "bedrock-conversation-2024",
        "system": [{"text": system["content"]}],
        "messages": [
            {"role": "user", "content": [{"text": user["content"]}]},
            {"role": "assistant", "content": [{"text": assistant["content"]}]},
        ],
    }
```

| OpenAI | Bedrock (Nova) |
| :--- | :--- |
| `system` dentro de `messages` | `system` em campo próprio |
| `"content": "texto"` | `"content": [{"text": "texto"}]` |
| — | `schemaVersion` obrigatório |

---

## 🪣 Upload para o S3

```python
s3 = boto3.client("s3")
s3.upload_file(str(BEDROCK_TRAIN), BUCKET, "fine-tuning/train.jsonl")
```

---

## 🚀 Criando o job

```python
job = bedrock.create_model_customization_job(
    jobName=nome,
    customModelName=nome,
    roleArn=ROLE_ARN,
    baseModelIdentifier="amazon.nova-lite-v1:0:300k",
    customizationType="FINE_TUNING",
    trainingDataConfig={"s3Uri": f"s3://{BUCKET}/fine-tuning/train.jsonl"},
    outputDataConfig={"s3Uri": f"s3://{BUCKET}/fine-tuning/output/"},
    hyperParameters={"epochCount": "2", "learningRate": "0.00001"},
)
```

| Parâmetro | Detalhe |
| :--- | :--- |
| `baseModelIdentifier` | Versão **customizável** do modelo (`:300k`), não o ID de inferência |
| `customizationType` | `FINE_TUNING` (rotulado) ou `CONTINUED_PRE_TRAINING` |
| `hyperParameters` | Valores sempre como **string** |
| `outputDataConfig` | Métricas de treino (loss) gravadas no S3 |

---

## ⏳ Acompanhando

```python
while (status := bedrock.get_model_customization_job(jobIdentifier=job_arn))["status"] == "InProgress":
    time.sleep(60)

MODEL_FILE.write_text(status["outputModelArn"])
```

O job costuma levar **de 30 min a algumas horas**. Também dá para acompanhar em **Custom models → Jobs**. O ARN do modelo é salvo em `data/bedrock_custom_model.txt` para a aula 223.

---

## ✅ Resumo

- Pré-requisitos: bucket S3 + IAM role que o Bedrock possa assumir.
- O dataset é o mesmo da OpenAI, só **convertido** para `bedrock-conversation-2024`.
- `create_model_customization_job` treina e gera um **custom model** (ARN).
- O custom model ainda **não responde**: é preciso fazer o deploy (aula 223).
