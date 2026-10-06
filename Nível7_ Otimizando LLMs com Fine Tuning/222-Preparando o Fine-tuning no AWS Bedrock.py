# pip install boto3 python-dotenv
import json
import os
import time
from pathlib import Path

import boto3
from dotenv import load_dotenv

load_dotenv()  # AWS_*, S3_BUCKET, BEDROCK_ROLE_ARN

DATA_DIR = Path(__file__).parent / "data"
BEDROCK_TRAIN = DATA_DIR / "bedrock_train.jsonl"
MODEL_FILE = DATA_DIR / "bedrock_custom_model.txt"

BASE_MODEL = "amazon.nova-lite-v1:0:300k"  # versão do Nova Lite que aceita customização
BUCKET = os.environ["S3_BUCKET"]
ROLE_ARN = os.environ["BEDROCK_ROLE_ARN"]


# 1. Convertendo do formato OpenAI (aula 217) para o formato do Nova
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


with open(DATA_DIR / "train.jsonl", encoding="utf-8") as f_in, open(BEDROCK_TRAIN, "w", encoding="utf-8") as f_out:
    for line in f_in:
        f_out.write(json.dumps(to_bedrock(json.loads(line)), ensure_ascii=False) + "\n")

# 2. Upload para o S3
s3 = boto3.client("s3")
s3.upload_file(str(BEDROCK_TRAIN), BUCKET, "fine-tuning/train.jsonl")
print(f"Dataset enviado: s3://{BUCKET}/fine-tuning/train.jsonl")

# 3. Criando o job de customização
bedrock = boto3.client("bedrock")
nome = f"hate-speech-pt-{int(time.time())}"

job = bedrock.create_model_customization_job(
    jobName=nome,
    customModelName=nome,
    roleArn=ROLE_ARN,
    baseModelIdentifier=BASE_MODEL,
    customizationType="FINE_TUNING",
    trainingDataConfig={"s3Uri": f"s3://{BUCKET}/fine-tuning/train.jsonl"},
    outputDataConfig={"s3Uri": f"s3://{BUCKET}/fine-tuning/output/"},
    hyperParameters={"epochCount": "2", "learningRate": "0.00001"},  # valores são strings
)
job_arn = job["jobArn"]
print("Job criado:", job_arn)

# 4. Acompanhando até terminar (InProgress → Completed / Failed / Stopped)
while (status := bedrock.get_model_customization_job(jobIdentifier=job_arn))["status"] == "InProgress":
    print(f"[InProgress] {time.strftime('%H:%M:%S')}")
    time.sleep(60)

if status["status"] != "Completed":
    raise SystemExit(f"Job terminou com status {status['status']}: {status.get('failureMessage')}")

# 5. Guardando o ARN do modelo para a aula 223
MODEL_FILE.write_text(status["outputModelArn"])
print("Custom model:", status["outputModelArn"])
