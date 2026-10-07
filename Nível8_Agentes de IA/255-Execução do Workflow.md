<h1 align="center">▶️ Execução do Workflow</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AutoGen_Studio-Playground-111827?style=flat-square&logo=microsoft&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Montar o Group Chat com `art_director` + `art_executor`, rodar no **Playground** e reproduzir o mesmo fluxo em código.

---

## 🧩 Montando o workflow

1. **Workflows** → workflow da aula 251.
2. *Receiver* = **Group Chat** com `art_director` e `art_executor`.
3. *Speaker selection* = `auto`, *max rounds* ≈ 10.
4. **Playground → New Session** → escolher o workflow.

Pedido de exemplo:

> *"Crie um banner para a newsletter de ações do Lucas, minimalista, tons de azul, com um gráfico em alta."*

---

## 💬 O que acontece na conversa

| Rodada | Quem fala | O quê |
| :---: | :--- | :--- |
| 1 | `user_proxy` | Envia o pedido |
| 2 | `art_director` | Conceito + prompt em inglês |
| 3 | `art_executor` | Chama `generate_image` e devolve o caminho |
| 4 | `art_director` | Revisa: pede ajuste **ou** responde `APROVADO` |

A imagem aparece nos arquivos da sessão no Playground.

---

## 🐍 Mesmo fluxo em código (AutoGen 0.4+)

```python
team = SelectorGroupChat(
    [art_director, art_executor],
    model_client=model_client,
    termination_condition=TextMentionTermination("APROVADO") | MaxMessageTermination(10),
)
await Console(team.run_stream(task="Crie um banner..."))
```

Código completo em `255-Execução do Workflow.py`.

> No Studio 0.4+ dá para **exportar o Team em JSON** e carregar no código, e vice-versa.

---

## ✅ Resumo

- Playground roda o workflow e mostra a conversa entre os agentes passo a passo.
- O diretor revisa e encerra com `APROVADO`; `MaxMessageTermination` é a rede de segurança.
- O mesmo fluxo em código usa `SelectorGroupChat` + `AssistantAgent` com tool.
