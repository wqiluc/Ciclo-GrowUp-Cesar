<h1 align="center">🧪 Testando o modelo tuned AWS Bedrock</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_7-Otimizando_LLMs_com_Fine_Tuning-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AWS-Bedrock-111827?style=flat-square&logo=amazonwebservices&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Fazer o **deploy** do custom model da aula 222 e compará-lo com o **Nova Lite base** nos tweets do `test.jsonl`, do mesmo jeito que na aula 219.

---

## 📦 Setup

```bash
pip install boto3 python-dotenv scikit-learn
```

Pré-requisitos: `data/test.jsonl` (aula 217) e `data/bedrock_custom_model.txt` (aula 222).

---

## 🚀 Deploy

Diferente da OpenAI, o custom model **não fica disponível automaticamente**. Duas opções:

| Opção | Cobrança | Quando usar |
| :--- | :--- | :--- |
| **On-demand deployment** | Por token | Testes e tráfego baixo |
| **Provisioned Throughput** | Por hora, ligado ou não | Produção com volume alto |

```python
deployment_arn = bedrock.create_custom_model_deployment(
    modelDeploymentName=nome,
    modelArn=CUSTOM_MODEL_ARN,
)["customModelDeploymentArn"]

while bedrock.get_custom_model_deployment(
    customModelDeploymentIdentifier=deployment_arn
)["status"] == "Creating":
    time.sleep(30)
```

> O **ARN do deployment** é o que vai no `modelId` das chamadas.

---

## 🤖 Classificando

```python
def classificar(model_id: str, exemplo: dict) -> str:
    system, user = exemplo["messages"][:2]
    resposta = runtime.converse(
        modelId=model_id,
        system=[{"text": system["content"]}],
        messages=[{"role": "user", "content": [{"text": user["content"]}]}],
        inferenceConfig={"temperature": 0, "maxTokens": 5},
    )
    return resposta["output"]["message"]["content"][0]["text"].strip().lower()
```

A mesma função serve para o modelo base (`us.amazon.nova-lite-v1:0`) e para o fine-tunado (ARN do deployment).

---

## 📊 Métricas

```python
for nome, model_id in (("Nova Lite base", BASE_MODEL), ("Nova Lite fine-tunado", deployment_arn)):
    y_pred = [classificar(model_id, ex) for ex in amostra]
    print(f"Acurácia: {accuracy_score(y_true, y_pred):.3f}")
    print(classification_report(y_true, y_pred, labels=["no-hate", "hate"], zero_division=0))
```

Mesma amostra (`seed=42`, 200 tweets) e mesmas métricas da aula 219. Assim dá para comparar **4 modelos**: GPT base, GPT fine-tunado, Nova base e Nova fine-tunado.

> Como na aula 219, olhe principalmente o **recall e o F1 de `hate`**, não só a acurácia.

---

## 🧹 Limpeza

```python
finally:
    bedrock.delete_custom_model_deployment(customModelDeploymentIdentifier=deployment_arn)
```

O `try/finally` garante que o deployment é removido mesmo se der erro no meio. O **custom model** continua salvo na conta (cobra armazenamento mensal); apague em **Custom models** se não for mais usar.

---

## ✅ Resumo

- Custom model no Bedrock precisa de **deploy** (on-demand ou Provisioned Throughput) antes de responder.
- O ARN do deployment entra como `modelId` na `converse`, igual a qualquer modelo.
- A avaliação repete a da aula 219 para comparar OpenAI x Bedrock.
- Sempre **remova** deployments e Provisioned Throughput após os testes.
