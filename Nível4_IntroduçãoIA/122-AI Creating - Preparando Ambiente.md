<h1 align="center">🚀 AI Creating - Preparando Ambiente</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_4-Introdução_à_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Setup-Ambiente_Python-111827?style=flat-square&logo=python&logoColor=white" />
</p>

> *Aula sem prints associados — resumo baseado em conhecimento geral de setup Python; revisar após assistir ao vídeo.*

<h2 align="left">⚙️ Ambiente virtual e dependências</h2>

Antes de treinar um modelo (AI Creating), o ambiente Python precisa isolar as dependências do projeto:

```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install pandas scikit-learn matplotlib jupyter
```

| Biblioteca | Papel no projeto |
| :--- | :--- |
| **pandas** | Carregar e organizar os dados de treino |
| **scikit-learn** | Treinar e avaliar o modelo de Classical ML |
| **matplotlib** | Visualizar dados e resultados |
| **jupyter** | Ambiente interativo para explorar os dados antes de treinar |

---

## ✅ Resumo

- Um ambiente virtual (`venv`) isola as dependências do projeto de IA do restante do sistema.
- **pandas**, **scikit-learn**, **matplotlib** e **jupyter** cobrem o básico para treinar e avaliar um modelo de Classical ML.
- Com o ambiente pronto, a próxima aula (AI Creating com Python) já treina um modelo de verdade.
