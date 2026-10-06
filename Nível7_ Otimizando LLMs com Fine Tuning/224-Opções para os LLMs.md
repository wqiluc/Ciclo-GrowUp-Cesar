<h1 align="center">🧭 Opções para os LLMs</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_7-Otimizando_LLMs_com_Fine_Tuning-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Tema-LLM_x_SLM-111827?style=flat-square" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Entender a diferença entre **LLMs**, **SLMs** e outros modelos, e **quando o fine-tuning realmente vale a pena**.

<img src="../img/finetuning14.png" width="800">

---

## 🤔 Quem precisa de fine-tuning?

<img src="../img/finetuning15.png" width="800">

> ~~Na maioria dos casos, LLMs não precisam de fine-tuning.~~
> **Na maioria dos casos, SLMs e outros LMs precisam de fine-tuning.**

- **LLMs** (GPT, Claude, Llama 405B) já são muito bons em quase tudo. Na maioria dos casos, **prompt engineering** e **RAG** (Nível 6) resolvem.
- **SLMs** (*Small Language Models*) são genéricos e mais fracos. Com fine-tuning, ficam **bons em uma task específica**, muitas vezes no nível de um LLM.

---

## 📏 Opções frente aos LLMs

<img src="../img/finetuning16.png" width="800">

| Modelo | Fornecedor | Parâmetros | Tipo |
| :--- | :--- | :--- | :--- |
| **GPT** | OpenAI | ~500B a 1T *(estimativa, não oficial)* | LLM fechado |
| **Llama 3** | Meta | 405B (maior versão) | LLM open weights |
| **Phi-3** | Microsoft | ~3B (mini) | SLM open weights |

> O número de **parâmetros** é o tamanho do modelo. Mais parâmetros = mais conhecimento geral, mas também mais custo e latência.

---

## ⚖️ LLM x SLM

| | LLM | SLM |
| :--- | :--- | :--- |
| **Qualidade geral** | Alta | Menor |
| **Custo de inferência** | Alto | Baixo |
| **Latência** | Maior | Menor |
| **Onde roda** | API / cluster de GPUs | GPU simples, notebook, celular |
| **Fine-tuning** | Caro, raramente necessário | Barato e **geralmente necessário** |
| **Privacidade** | Dados vão para o fornecedor | Pode rodar **local** |

---

## 🧩 Quando escolher cada um

```mermaid
flowchart TD
    A["Task nova"] --> B{"Prompt / RAG<br/>no LLM resolve?"}
    B -- Sim --> C["✅ Use o LLM"]
    B -- Não --> D{"Custo, latência ou<br/>privacidade importam?"}
    D -- Sim --> E["🔧 Fine-tuning de um SLM"]
    D -- Não --> F["🔧 Fine-tuning do LLM<br/>(OpenAI / Bedrock)"]
```

---

## ✅ Resumo

- LLMs (GPT, Llama 405B) raramente precisam de fine-tuning: prompt e RAG costumam bastar.
- SLMs (Phi-3, ~3B) são leves e baratos, e é neles que o fine-tuning faz mais diferença.
- Um SLM fine-tunado pode igualar um LLM em uma task específica, com menos custo e latência.
- A escolha depende de **qualidade x custo x latência x privacidade**.
