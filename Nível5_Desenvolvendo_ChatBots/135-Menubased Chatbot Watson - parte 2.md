<h1 align="center">🔢 Menubased Chatbot Watson - parte 2</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_5-Desenvolvendo_ChatBots-111827?style=flat-square&logo=probot&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Tipo-Menu--Based-111827?style=flat-square" />
</p>

<h2 align="left">📌 Submenus e navegação</h2>

Com o menu principal pronto, cada ramo ganha seus próprios **submenus**, também com respostas do tipo **Options**.

---

## 🧭 Organizando em Actions

Em vez de colocar tudo em um único fluxo gigante, cada ramo pode virar uma **action própria**, chamada a partir do menu:

| Recurso | Uso |
| :--- | :--- |
| **And then → Go to a subaction** | Chama outra action e depois volta |
| **And then → Continue to next step** | Segue para o próximo step |
| **And then → End the action** | Encerra o fluxo atual |

```mermaid
flowchart LR
    A["👋 Menu principal"] -->|Produtos| B["⚡ Action: Produtos"]
    A -->|Pedidos| C["⚡ Action: Pedidos"]
    B --> D["↩️ Voltar ao menu"]
    C --> D
```

---

## ↩️ Opção "Voltar"

Todo submenu deve ter uma opção para **voltar ao menu principal** ou **encerrar** — o usuário não pode ficar preso.

---

## ✅ Resumo

- Submenus usam o mesmo padrão: **Options** + steps condicionados.
- Separar ramos em **subactions** deixa o bot mais organizado.
- Sempre oferecer caminho de volta ou de saída.
