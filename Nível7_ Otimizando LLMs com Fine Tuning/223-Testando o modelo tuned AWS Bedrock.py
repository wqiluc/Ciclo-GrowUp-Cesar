# pip install boto3 python-dotenv scikit-learn
import json
import random
import time
from pathlib import Path

import boto3
from dotenv import load_dotenv
from sklearn.metrics import accuracy_score, classification_report

load_dotenv()

DATA_DIR = Path(__file__).parent / "data"
BASE_MODEL = "us.amazon.nova-lite-v1:0"
CUSTOM_MODEL_ARN = (DATA_DIR / "bedrock_custom_model.txt").read_text().strip()  # gerado na aula 222
N_AMOSTRAS = 200

bedrock = boto3.client("bedrock")
runtime = boto3.client("bedrock-runtime")

# 1. Deploy on-demand do custom model (cobra por token, sem custo por hora parado)
deployment_arn = bedrock.create_custom_model_deployment(
    modelDeploymentName=f"hate-speech-pt-{int(time.time())}",
    modelArn=CUSTOM_MODEL_ARN,
)["customModelDeploymentArn"]

while (status := bedrock.get_custom_model_deployment(customModelDeploymentIdentifier=deployment_arn)["status"]) == "Creating":
    print("[Creating] aguardando deployment...")
    time.sleep(30)
if status != "Active":
    raise SystemExit(f"Deployment falhou: {status}")

# 2. Mesma amostra da aula 219, para comparar com o GPT
with open(DATA_DIR / "test.jsonl", encoding="utf-8") as f:
    test_data = [json.loads(line) for line in f]

random.seed(42)
amostra = random.sample(test_data, N_AMOSTRAS)


def classificar(model_id: str, exemplo: dict) -> str:
    system, user = exemplo["messages"][:2]
    resposta = runtime.converse(
        modelId=model_id,
        system=[{"text": system["content"]}],
        messages=[{"role": "user", "content": [{"text": user["content"]}]}],
        inferenceConfig={"temperature": 0, "maxTokens": 5},
    )
    return resposta["output"]["message"]["content"][0]["text"].strip().lower()


try:
    y_true = [ex["messages"][2]["content"] for ex in amostra]

    for nome, model_id in (("Nova Lite base", BASE_MODEL), ("Nova Lite fine-tunado", deployment_arn)):
        y_pred = [classificar(model_id, ex) for ex in amostra]
        print(f"\n=== {nome}")
        print(f"Acurácia: {accuracy_score(y_true, y_pred):.3f}")
        print(classification_report(y_true, y_pred, labels=["no-hate", "hate"], zero_division=0))

    # Teste manual
    tweet = "bom dia a todos, ótima semana!"
    exemplo = {"messages": [amostra[0]["messages"][0], {"role": "user", "content": tweet}]}
    print(tweet, "→", classificar(deployment_arn, exemplo))
finally:
    # 3. Limpeza: remove o deployment para não deixar recurso ativo
    bedrock.delete_custom_model_deployment(customModelDeploymentIdentifier=deployment_arn)
    print("Deployment removido.")
