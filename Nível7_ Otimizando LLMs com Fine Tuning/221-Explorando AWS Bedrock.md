<h1 align="center">🧭 Explorando AWS Bedrock</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_7-Otimizando_LLMs_com_Fine_Tuning-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AWS-Bedrock-111827?style=flat-square&logo=amazonwebservices&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Navegar pelo console do Bedrock, liberar acesso a um modelo e fazer a **primeira chamada via Python** com `boto3`.

---

## 🖥️ Tour pelo console

Console AWS → busque **Amazon Bedrock** → escolha a **região** (ex.: `us-east-1`).

| Menu | O que tem |
| :--- | :--- |
| **Model catalog** | Todos os modelos, com fornecedor, modalidade e preço |
| **Model access** | Onde você **libera** o uso de cada modelo na conta |
| **Playgrounds** | Chat / Text / Image para testar sem código |
| **Custom models** | Jobs de fine-tuning e continued pre-training |
| **Provisioned Throughput** | Capacidade dedicada para servir custom models |

> Modelos e recursos variam por **região**. Se algo não aparece, confira a região no canto superior direito.

---

## 🔓 Liberando modelos

1. **Model access** → **Modify model access**.
2. Marque os modelos (ex.: **Amazon Nova Lite**, **Claude**, **Llama**).
3. Envie. Modelos da Amazon costumam liberar na hora; alguns fornecedores pedem um formulário de caso de uso.

---

## 💬 Playground

**Playgrounds → Chat** → selecione o modelo e converse.

| Parâmetro | Efeito |
| :--- | :--- |
| `Temperature` | Criatividade (0 = determinístico) |
| `Top P` | Corte de probabilidade acumulada dos tokens |
| `Max tokens` | Tamanho máximo da resposta |

> O playground tem a opção **Compare mode**: dá para mandar o mesmo prompt para dois modelos lado a lado.

---

## 🐍 Primeira chamada com `boto3`

```bash
pip install boto3 python-dotenv
```

Credenciais no `.env` (usuário IAM com permissão `bedrock:*`):

```env
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_DEFAULT_REGION=us-east-1
```

### Listando modelos

```python
bedrock = boto3.client("bedrock")  # gerenciamento: modelos, jobs, custom models

for m in bedrock.list_foundation_models(byOutputModality="TEXT")["modelSummaries"]:
    print(f"{m['providerName']:<12} {m['modelId']}")
```

### Conversando com a Converse API

```python
runtime = boto3.client("bedrock-runtime")  # inferência

resposta = runtime.converse(
    modelId=MODEL_ID,
    messages=[{"role": "user", "content": [{"text": "O que é fine-tuning?"}]}],
    inferenceConfig={"temperature": 0, "maxTokens": 200},
)
print(resposta["output"]["message"]["content"][0]["text"])
```

| Cliente | Para quê |
| :--- | :--- |
| `bedrock` | Plano de controle: listar modelos, criar jobs de customização |
| `bedrock-runtime` | Plano de dados: chamar o modelo (`converse`, `invoke_model`) |

> A **Converse API** tem o mesmo formato para todos os modelos. Trocar de Nova para Claude ou Llama é só mudar o `modelId`.

---

## ✅ Resumo

- O console reúne catálogo, acesso a modelos, playgrounds e customização.
- Antes de usar um modelo é preciso **liberar o acesso** na região.
- `bedrock` gerencia; `bedrock-runtime` faz a inferência.
- `converse` padroniza a chamada entre fornecedores.
