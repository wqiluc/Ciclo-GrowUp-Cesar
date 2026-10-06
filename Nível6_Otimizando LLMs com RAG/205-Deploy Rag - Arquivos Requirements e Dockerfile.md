<h1 align="center">🐳 Deploy Rag - Arquivos Requirements e Dockerfile</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AWS-Deploy_RAG-111827?style=flat-square&logo=amazonwebservices&logoColor=white" />
</p>

<h2 align="left">📁 Estrutura</h2>

```
deploy-rag/
├── app.py            # = 204-...Lambda Handler.py
├── documento.pdf
├── requirements.txt
└── Dockerfile
```

---

## 📦 requirements.txt

```txt
langchain
langchain-classic
langchain-community
langchain-openai
langchain-chroma
langchain-text-splitters
pypdf
python-dotenv
```

---

## 🐳 Dockerfile

```dockerfile
FROM public.ecr.aws/lambda/python:3.12

COPY requirements.txt ${LAMBDA_TASK_ROOT}
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py documento.pdf ${LAMBDA_TASK_ROOT}/

CMD ["app.lambda_handler"]
```

| Linha | Por quê |
| :--- | :--- |
| `lambda/python:3.12` | Imagem base da AWS, já com o runtime da Lambda |
| `${LAMBDA_TASK_ROOT}` | Pasta onde a Lambda procura o código (`/var/task`) |
| `CMD` | `arquivo.função` do handler |

> 🔐 O `.env` **não** entra na imagem: a `OPENAI_API_KEY` vai como variável de ambiente da Lambda (aula 208).
>
> ⚠️ Na Lambda só `/tmp` é gravável: o Chroma em memória (sem `persist_directory`) evita problema.

---

## ▶️ Build e teste local

```bash
docker build --platform linux/amd64 -t deploy-rag .
docker run -p 9000:8080 -e OPENAI_API_KEY=sk-... deploy-rag

curl -X POST "http://localhost:9000/2015-03-31/functions/function/invocations" \
  -d '{"body": "{\"pergunta\": \"Qual é o tema do documento?\"}"}'
```

> 💡 A imagem base traz o **Runtime Interface Emulator**, que simula a Lambda na porta 8080.

---

## ✅ Resumo

- `requirements.txt` fixa as libs; `Dockerfile` monta a imagem no formato da Lambda.
