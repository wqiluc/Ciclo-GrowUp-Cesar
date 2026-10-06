# pip install boto3 python-dotenv
import boto3
from dotenv import load_dotenv

load_dotenv()  # AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION

MODEL_ID = "us.amazon.nova-lite-v1:0"  # precisa estar liberado em Model access

bedrock = boto3.client("bedrock")
runtime = boto3.client("bedrock-runtime")

# Modelos de texto disponíveis na região
for m in bedrock.list_foundation_models(byOutputModality="TEXT")["modelSummaries"]:
    print(f"{m['providerName']:<12} {m['modelId']}")

# Primeira chamada
resposta = runtime.converse(
    modelId=MODEL_ID,
    messages=[{"role": "user", "content": [{"text": "O que é fine-tuning? Responda em 2 frases."}]}],
    inferenceConfig={"temperature": 0, "maxTokens": 200},
)
print("\n" + resposta["output"]["message"]["content"][0]["text"])
