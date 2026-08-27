<h1 align="center">🧪 Aula 68 — Introdução ao Flask (parte 1)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_3-Flask-111827?style=flat-square&logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Concluída-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-111827?style=flat-square&logo=python&logoColor=3776AB" />
  <img src="https://img.shields.io/badge/Flask-111827?style=flat-square&logo=flask&logoColor=white" />
</p>

<p align="center"><img src="../img/flask3.png" width="800"></p>

## 📌 O que é o Flask?

**Flask** é um **microframework web** escrito em Python, usado para construir aplicações e APIs de forma rápida, com poucas dependências obrigatórias e sem impor uma estrutura rígida de projeto.

---

## 🚀 Vantagens do Flask

<p align="center"><img src="../img/flask4.png" width="800"></p>

| Vantagem | Descrição |
| :--- | :--- |
| 🧩 **Simplicidade** | Código legível e intuitivo, curva de aprendizado baixa — ótimo para iniciantes e experientes. |
| 📈 **Escalabilidade** | Estende-se com extensões e bibliotecas (ex: `Flask-SQLAlchemy`, `Flask-Cors`) conforme o projeto cresce. |
| 🔧 **Flexibilidade** | Não impõe estrutura rígida — o dev escolhe as próprias ferramentas e arquitetura. |

---

## 🕰️ História do Flask

<p align="center"><img src="../img/flask5.png" width="800"></p>

| Item | Detalhe |
| :--- | :--- |
| 👤 Criador | Armin Ronacher |
| 📅 Lançamento | 1º de abril de 2010 |
| 🧵 Projetos irmãos | Jinja2, Werkzeug, Click |
| 🎯 Filosofia | Simplicidade + liberdade de ferramentas, sem abrir mão de poder para apps robustas |

---

## 🏢 Usos reais no mercado

<p align="center"><img src="../img/flask6.png" width="800"></p>

| Empresa | Uso do Flask |
| :--- | :--- |
| 📌 **Pinterest** | Base das APIs desde 2012, recebendo bilhões de requisições/dia |
| 💼 **LinkedIn** | Serviços internos do time de engenharia de experimentação |
| 🎬 **Netflix** | Serviços internos menores, ao lado da arquitetura principal em Java |
| 🚗 **Uber** | Ferramentas e serviços internos do ecossistema |

---

## 📦 Setup do projeto — `requirements.txt`

<p align="center"><img src="../img/flask7.png" width="800"></p>

Dependências principais atualizadas para as versões mais recentes disponíveis (`pip freeze`):

| Pacote | Versão | Papel |
| :--- | :---: | :--- |
| ![Flask](https://img.shields.io/badge/-Flask-111827?style=flat-square&logo=flask&logoColor=white) | `3.1.3` | Microframework web |
| ![Flask--SQLAlchemy](https://img.shields.io/badge/-Flask--SQLAlchemy-111827?style=flat-square&logo=python&logoColor=red) | `3.1.1` | ORM integrado ao Flask |
| ![Flask--Cors](https://img.shields.io/badge/-Flask--Cors-111827?style=flat-square&logo=flask&logoColor=white) | `6.0.5` | Habilita CORS nas rotas |
| ![Werkzeug](https://img.shields.io/badge/-Werkzeug-111827?style=flat-square&logo=python&logoColor=3776AB) | `3.1.8` | WSGI toolkit por trás do Flask |
| SQLAlchemy | `2.0.52` | ORM/Core usado pelo Flask-SQLAlchemy |
| Jinja2 | `3.1.6` | Motor de templates |
| MarkupSafe | `3.0.3` | Escapa strings para o Jinja2 |
| Click | `8.5.0` | CLI do Flask (`flask run`, etc.) |
| itsdangerous | `2.2.0` | Assinatura segura de dados (sessions/cookies) |
| blinker | `1.9.0` | Sinais internos do Flask |
| greenlet | `3.5.5` | Suporte a coroutines do SQLAlchemy |
| typing_extensions | `4.16.0` | Tipagem estendida usada pelo SQLAlchemy |

Arquivo completo em [`requirements.txt`](requirements.txt):

```txt
blinker==1.9.0
click==8.5.0
Flask==3.1.3
Flask-Cors==6.0.5
Flask-SQLAlchemy==3.1.1
greenlet==3.5.5
itsdangerous==2.2.0
Jinja2==3.1.6
MarkupSafe==3.0.3
SQLAlchemy==2.0.52
typing_extensions==4.16.0
Werkzeug==3.1.8
```

Instalação:

```bash
pip install -r requirements.txt
```

---

## 👋 Primeira rota — Hello World

Rota `index` básica, retornando texto puro na raiz (`/`). Código completo em [`68-Introdução ao Flask - parte 1.py`](68-Introdução%20ao%20Flask%20-%20parte%201.py):

```python
from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
    return "Hello, World!"


if __name__ == "__main__":
    app.run(debug=True)
```

Executando:

```bash
python3 "68-Introdução ao Flask - parte 1.py"
```

Servidor sobe em `http://127.0.0.1:5000/` — acessando a raiz, a resposta é `Hello, World!` ✅
