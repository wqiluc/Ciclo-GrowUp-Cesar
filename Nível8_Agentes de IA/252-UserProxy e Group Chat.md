<h1 align="center">💬 UserProxy e Group Chat</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AutoGen_Studio-Group_Chat-111827?style=flat-square&logo=microsoft&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Entender os dois tipos de agente "estruturais" do AutoGen: o **UserProxy** e o **Group Chat**.

---

## 👤 UserProxyAgent

Representa **o usuário** dentro da conversa.

| Característica | Detalhe |
| :--- | :--- |
| Usa LLM? | Normalmente **não** |
| Papel | Envia o pedido inicial e responde em nome do humano |
| `human_input_mode` | `NEVER` (automático), `TERMINATE` (pede input só no fim), `ALWAYS` (pede sempre) |
| Execução de código | Pode **executar** o código que outro agente escreveu (no Studio 0.1) |

---

## 💬 Group Chat

Um "agente" que **coordena** vários agentes numa conversa compartilhada.

```mermaid
sequenceDiagram
    participant U as 👤 UserProxy
    participant M as 💬 Group Chat Manager
    participant D as 🎨 Art Director
    participant E as 🖌️ Art Executor
    U->>M: "Crie uma arte para..."
    M->>D: (seleciona quem fala)
    D-->>M: conceito + prompt
    M->>E: (seleciona quem fala)
    E-->>M: imagem gerada
    M-->>U: TERMINATE
```

| Configuração | Para que serve |
| :--- | :--- |
| **Agentes** | Quem participa da conversa |
| **Speaker selection** | `auto` (LLM escolhe), `round_robin` (revezamento) |
| **Max rounds** | Limite de mensagens: evita loop infinito |
| **Termination** | Palavra que encerra (ex.: `TERMINATE`) |

---

## ✅ Resumo

- **UserProxy** = o humano na conversa (envia pedido, pode executar código).
- **Group Chat** = conversa compartilhada; um seletor decide quem fala a cada rodada.
- Sempre configurar **max rounds** e **termination** para não gastar tokens à toa.
