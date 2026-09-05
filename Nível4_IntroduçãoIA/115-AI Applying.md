<h1 align="center">🚀 AI Applying</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_4-Introdução_à_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/SaaS-Modelos_como_Serviço-111827?style=flat-square" />
</p>

<h2 align="left">☁️ AI Applying - SaaS</h2>

Na prática, a forma mais comum de aplicar IA hoje não é treinar um modelo do zero — é **consumir modelos genéricos já prontos, como serviço (SaaS)**:

<p align="center"><img src="../img/ia9.png" width="800"></p>

| Provedor | Serviço |
| :--- | :--- |
| **Microsoft Azure** | AI/ML como parte da nuvem Azure |
| **AWS** | Serviços de IA/ML da Amazon |
| **Google Cloud** | AI/ML como parte do Google Cloud Platform |
| **IBM Cloud** | Plataforma de IA da IBM (herdeira do Watson) |
| **OpenAI** | Modelos de linguagem (GPT) consumidos via API |

Em vez de coletar dados, treinar e hospedar um modelo, uma aplicação simplesmente **chama uma API** e recebe o resultado pronto — o que reduz drasticamente o custo e o tempo para colocar IA em produção.

---

## 🔗 Como funciona por baixo: o exemplo do ChatGPT

O ChatGPT é um bom exemplo de AI Applying na prática: ele **não é** o modelo em si, é o **frontend** que fala com o modelo:

<p align="center"><img src="../img/ia10.png" width="800"></p>

1. O **User** faz uma pergunta ao **ChatGPT (Frontend)**.
2. O ChatGPT monta uma **Request** — `{ Query + Instructions }` — e envia para o **GPT (Modelo LLM)**.
3. O modelo processa e devolve uma **Response** ao ChatGPT.
4. O ChatGPT repassa essa resposta de volta ao usuário.

Essa separação entre frontend (interface) e modelo (LLM, consumido via API) é o mesmo padrão usado por qualquer aplicação que integra IA como serviço — a aplicação nunca precisa saber como o modelo foi treinado, só como chamá-lo.

---

## ✅ Resumo

- **AI Applying via SaaS** é consumir modelos genéricos de IA prontos, oferecidos por grandes provedores (Azure, AWS, Google Cloud, IBM Cloud, OpenAI), em vez de treinar um modelo próprio.
- O **ChatGPT** ilustra esse padrão: um frontend que envia `{Query + Instructions}` para um modelo LLM (GPT) via API e retorna a resposta ao usuário.
- Essa abordagem reduz custo e complexidade — a aplicação usa a IA como um serviço externo, sem precisar treinar ou hospedar o modelo.
