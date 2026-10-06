<h1 align="center">☁️ Deploy Rag - Introdução</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AWS-Deploy_RAG-111827?style=flat-square&logo=amazonwebservices&logoColor=white" />
</p>

<img src="../img/deployrag1.png" width="800">

<h2 align="left">🎯 Objetivo</h2>

Tirar o RAG do notebook/terminal e expor como uma **API na AWS**: o usuário manda uma pergunta via HTTP e recebe a resposta do LLM.

---

## 🏗️ Arquitetura simples de RAG

<img src="../img/deployrag2.png" width="800">

```mermaid
flowchart LR
    U["👤 Usuário"] --> Q["❓ Question"] --> ALB["⚖️ ALB"] --> L["λ Lambda"]
    ECR["📦 ECR Registry"] --> L
    subgraph C["🐳 Container"]
        D["📄 Document"] --> E["🧠 Embedding"] --> V[("🗄️ Vector DB")]
        V --> P["❓ + 📄 chunks"] --> LLM["🧠 LLM"]
    end
    C --> ECR
```

| Peça | Papel |
| :--- | :--- |
| **Docker** | Empacota código + libs + documento numa imagem |
| **ECR** | Registry onde a imagem fica guardada na AWS |
| **Lambda** | Roda o container sob demanda (serverless) |
| **ALB** | Recebe o HTTP e repassa para a Lambda |

---

## 🗺️ Roteiro

| Aula | Etapa |
| :---: | :--- |
| 202 | Notebook → `app.py` com funções de load |
| 203 | Função `response` |
| 204 | `lambda_handler` |
| 205 | `requirements.txt` + `Dockerfile` |
| 206 | AWS CLI |
| 207 | Push da imagem para o ECR |
| 208 | Lambda a partir da imagem |
| 209 | API com ALB |
| 210 | Chamada da API |

> ⚠️ Esboço: os passos de AWS ficam documentados, sem deploy real.

---

## ✅ Resumo

- RAG vira um container Docker, publicado no ECR e executado pela Lambda.
- O ALB expõe a Lambda como endpoint HTTP.
