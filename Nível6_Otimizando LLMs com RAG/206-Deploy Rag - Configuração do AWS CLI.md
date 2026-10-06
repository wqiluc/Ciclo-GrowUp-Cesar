<h1 align="center">🔧 Deploy Rag - Configuração do AWS CLI</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AWS-Deploy_RAG-111827?style=flat-square&logo=amazonwebservices&logoColor=white" />
</p>

<h2 align="left">⬇️ Instalar</h2>

```bash
brew install awscli
aws --version
```

---

## 🔑 Credenciais

No console: **IAM → Users → (usuário) → Security credentials → Create access key**.

```bash
aws configure
# AWS Access Key ID:     AKIA...
# AWS Secret Access Key: ...
# Default region name:   us-east-1
# Default output format: json
```

Salva em `~/.aws/credentials` e `~/.aws/config`.

```bash
aws sts get-caller-identity   # confirma conta e usuário
```

---

## 🛡️ Permissões mínimas do usuário

| Serviço | Para |
| :--- | :--- |
| ECR | Criar repositório e dar push |
| Lambda | Criar/atualizar a função |
| EC2 / ELB | Criar ALB e target group |
| IAM (`PassRole`) | Associar a role de execução à Lambda |

> ⚠️ Nunca commitar access keys. Prefira um usuário só para o projeto, não o root.

---

## ✅ Resumo

- `aws configure` deixa o terminal autenticado na conta e região.
