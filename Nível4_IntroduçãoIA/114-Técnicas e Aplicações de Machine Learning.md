<h1 align="center">🚀 Técnicas e Aplicações de Machine Learning</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_4-Introdução_à_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/ML-Técnicas_e_Aplicações-111827?style=flat-square" />
</p>

<h2 align="left">🧮 Técnicas de Classical ML</h2>

Dentro do Classical ML (visto na aula anterior), algumas técnicas aparecem em praticamente todo problema de dados estruturados:

<p align="center"><img src="../img/ia6.png" width="800"></p>

| Técnica | Ideia central |
| :--- | :--- |
| **Linear Regression** | Ajusta uma reta (ou hiperplano) que relaciona variáveis de entrada a uma saída numérica |
| **Decision Tree** | Divide os dados em perguntas sucessivas do tipo SE/ENTÃO até chegar numa decisão |
| **Random Forest** | Combina várias Decision Trees treinadas em subconjuntos diferentes dos dados, votando no resultado final |
| **XGBoost** | Constrói árvores em sequência, cada uma corrigindo o erro da anterior — muito usado em competições e produção |

Random Forest e XGBoost são exemplos de **ensemble**: várias árvores fracas combinadas formam um modelo mais forte e mais resistente a overfitting do que uma única árvore.

---

## 🌍 Áreas de aplicação de IA

Além das subáreas técnicas (Machine Learning, Deep Learning, RL), a IA também pode ser organizada pelo **tipo de problema que resolve**:

<p align="center"><img src="../img/ia7.png" width="800"></p>

| Área | O que resolve |
| :--- | :--- |
| **NLP** (Natural Language Processing) | Tradução, classificação/clustering de texto, extração de informação |
| **Speech** | Conversão voz-texto (speech to text) e texto-voz (text to speech) |
| **Vision** | Reconhecimento de imagem, machine vision |
| **Robotics** | Controle e tomada de decisão de robôs físicos |
| **Expert Systems** | Sistemas de regras para domínios específicos (herança da Symbolic AI) |
| **Planning, Scheduling & Optimization** | Encontrar a melhor sequência de ações dado um conjunto de restrições |

Machine Learning e Deep Learning não são áreas isoladas — eles são as técnicas por trás de várias dessas aplicações (ex: Deep Learning viabiliza boa parte do NLP e da Vision atuais).

---

## 🆚 AI Creating x AI Applying

<p align="center"><img src="../img/ia8.png" width="800"></p>

Existe uma distinção prática de como a IA é usada:

- **AI Applying** — a IA analisa dados existentes para classificar, prever ou decidir algo (ex: prever se um cliente vai cancelar um plano, detectar fraude, recomendar produtos).
- **AI Creating** — a IA gera conteúdo novo que não existia antes (ex: imagens, texto, áudio) — é o caso de GAN's e dos modelos generativos modernos.

```mermaid
flowchart LR
    A["🧠 Artificial Intelligence"] --> B["📊 Machine Learning"]
    B --> C["🧬 Deep Learning"]
    C --> D["🎨 GAN's"]
    A --> E["🔍 AI Applying\n(classificar, prever, decidir)"]
    A --> F["🎨 AI Creating\n(gerar conteúdo novo)"]
    D --> F
```

---

## ✅ Resumo

- **Linear Regression, Decision Tree, Random Forest e XGBoost** são técnicas centrais do Classical ML — as duas últimas combinam várias árvores (ensemble) para ganhar precisão e robustez.
- A IA também pode ser organizada por **área de aplicação**: NLP, Speech, Vision, Robotics, Expert Systems e Planning/Optimization — cada uma resolvendo um tipo de problema diferente.
- **AI Applying** usa IA para analisar e decidir sobre dados existentes; **AI Creating** usa IA (como GAN's) para gerar conteúdo novo — é a base dos modelos generativos.
