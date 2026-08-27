<h1 align="center">🔌 Aula 70 — Conceitos Básicos de API e API REST</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_3-Flask-111827?style=flat-square&logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Concluída-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/API-REST-111827?style=flat-square&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/HTTP-Protocolo-111827?style=flat-square&logo=w3c&logoColor=white" />
  <img src="https://img.shields.io/badge/JSON-Formato-111827?style=flat-square&logo=json&logoColor=white" />
</p>

<p align="center"><img src="../img/api1.png" width="800"></p>

## 📌 O que é uma API?

**API** = **A**pplication **P**rogramming **Interface** (Interface de Programação de Aplicações).

É um conjunto de regras que permite que **dois sistemas diferentes conversem entre si** — sem que um precise conhecer os detalhes internos do outro. Funciona como um "garçom": o **cliente** faz um pedido (request), a API leva esse pedido até o **servidor**, que devolve a resposta (response).

> 🗣️ Analogia: assim como duas pessoas trocam mensagens usando uma linguagem em comum, dois sistemas trocam dados usando uma API como intermediária.

---

## 🔄 Como funciona: Request e Response

<p align="center"><img src="../img/api2.png" width="800"></p>

| Termo | Ícone | Descrição |
| :--- | :---: | :--- |
| **Cliente** | 💻 | Quem faz a solicitação (navegador, app mobile, outro sistema) |
| **Request** | 📤 | A requisição enviada ao servidor (método + URL + dados) |
| **API** | 🔌 | A "porta de entrada" que recebe e roteia a requisição |
| **API Server** | 🖥️ | Onde a lógica de negócio processa o pedido |
| **Response** | 📥 | A resposta devolvida ao cliente (status + dados) |

```mermaid
sequenceDiagram
    participant C as 💻 Cliente
    participant A as 🔌 API
    participant S as 🖥️ API Server

    C->>A: 📤 REQUEST (método + URL + body)
    A->>S: repassa a requisição
    S-->>A: processa e monta a resposta
    A-->>C: 📥 RESPONSE (status + dados)
```

---

## 🌐 Métodos HTTP

<p align="center"><img src="../img/api3.png" width="800"></p>

Os **verbos HTTP** indicam a *intenção* da requisição — o que o cliente quer fazer com o recurso apontado pela URL.

| Verbo | Ícone | Ação | Exemplo |
| :--- | :---: | :--- | :--- |
| ![GET](https://img.shields.io/badge/-GET-111827?style=flat-square) | 🔍 | Buscar/ler um recurso | `GET /usuarios` |
| ![POST](https://img.shields.io/badge/-POST-111827?style=flat-square) | ➕ | Criar um novo recurso | `POST /usuarios` |
| ![PUT](https://img.shields.io/badge/-PUT-111827?style=flat-square) | 🔁 | Substituir um recurso inteiro | `PUT /usuarios/1` |
| ![PATCH](https://img.shields.io/badge/-PATCH-111827?style=flat-square) | 🩹 | Atualizar parte de um recurso | `PATCH /usuarios/1` |
| ![DELETE](https://img.shields.io/badge/-DELETE-111827?style=flat-square) | 🗑️ | Remover um recurso | `DELETE /usuarios/1` |

Anatomia de uma requisição, usando `/hello_world` como rota de exemplo:

| Parte | Exemplo | Papel |
| :--- | :--- | :--- |
| 🌐 URL | `http://127.0.0.1:5000/hello_world` | Endereço do recurso |
| 🔤 Método | `GET` | Ação desejada |
| 📦 Corpo (body) | `{"nome": "Lucas"}` | Dados enviados (POST/PUT/PATCH) |
| 📨 Formato | `JSON` ou `XML` | Como os dados são estruturados |

```mermaid
flowchart LR
    U["/usuarios"]
    U -->|"🔍 GET"| R1["Lista/lê usuários"]
    U -->|"➕ POST"| R2["Cria usuário"]
    U -->|"🔁 PUT"| R3["Substitui usuário inteiro"]
    U -->|"🩹 PATCH"| R4["Atualiza campo do usuário"]
    U -->|"🗑️ DELETE"| R5["Remove usuário"]
```

---

## 🆚 API REST x API RESTful

<p align="center"><img src="../img/api4.png" width="800"></p>

**REST** = **RE**presentational **S**tate **T**ransfer (Transferência de Estado Representacional). É um **estilo arquitetural** — um conjunto de boas práticas para projetar APIs — proposto por Roy Fielding em 2000.

| Conceito | Definição |
| :--- | :--- |
| 🏛️ **API REST** | O *estilo*/conjunto de princípios (stateless, uso correto de verbos HTTP, recursos identificados por URL, etc.) |
| ✅ **API RESTful** | Uma API que **segue de fato** os princípios REST na prática |

> 💡 Toda API RESTful é REST, mas nem toda API que se diz "REST" cumpre 100% dos princípios — por isso o termo **RESTful** existe para reforçar a aderência real às regras.

```mermaid
flowchart TD
    API["🔌 API<br/>(interface genérica)"] --> REST["🏛️ API REST<br/>(segue o estilo arquitetural)"]
    REST --> RESTFUL["✅ API RESTful<br/>(aplica os princípios na prática)"]

    style API fill:#111827,color:#fff
    style REST fill:#1f2937,color:#fff
    style RESTFUL fill:#065f46,color:#fff
```

### 🧱 Princípios REST

| Princípio | Descrição |
| :--- | :--- |
| 🚫 **Stateless** | O servidor não guarda estado entre requisições — cada request é independente |
| 📍 **Recursos via URL** | Cada entidade (usuário, produto...) tem uma URL própria (`/usuarios/1`) |
| 🔤 **Verbos HTTP corretos** | GET para ler, POST para criar, etc. — sem misturar responsabilidades |
| 📨 **Representação de dados** | Os dados trafegam em formatos padronizados, geralmente `JSON` |
| 🔗 **Interface uniforme** | Mesmo padrão de acesso para todos os recursos da API |

---

## 🔀 API REST x API comum — diferenças

| | 🔌 API (genérica) | 🏛️ API REST |
| :--- | :--- | :--- |
| **Definição** | Qualquer interface que permite comunicação entre sistemas | API que segue os princípios arquiteturais REST |
| **Protocolo** | Pode usar qualquer protocolo (SOAP, RPC, GraphQL, HTTP...) | Usa **HTTP** como protocolo de transporte |
| **Estado** | Pode manter estado entre chamadas (*stateful*) | É **stateless** por definição |
| **Formato de dados** | Livre (XML, binário, texto...) | Geralmente `JSON`, também aceita `XML` |
| **Estrutura de URL** | Sem convenção fixa | Recursos identificados por URLs (`/recurso/id`) |

---

## ✅ Resumo

- **API** conecta dois sistemas (cliente ↔ servidor) por meio de **requests** e **responses**.
- Os **métodos HTTP** (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) definem a intenção de cada requisição.
- **REST** é o estilo arquitetural; **RESTful** é a API que realmente segue esse estilo.
- Dados normalmente trafegam em **JSON**.
