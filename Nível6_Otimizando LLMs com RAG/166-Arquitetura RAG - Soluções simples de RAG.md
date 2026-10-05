<h1 align="center">🪶 Arquitetura RAG - Soluções simples de RAG</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Arquitetura-RAG_simples-111827?style=flat-square" />
</p>

<h2 align="left">📌 Nem todo RAG precisa de banco vetorial</h2>

Para casos pequenos, dá para fazer um RAG "manual".

| Solução | Como funciona | Quando usar |
| :--- | :--- | :--- |
| **Contexto fixo** | Cola o documento inteiro no prompt | Texto curto, cabe na janela de contexto |
| **Busca por palavra-chave** | Filtra trechos que contêm termos da pergunta | Perguntas com termos exatos |
| **Embeddings em memória** | Vetoriza chunks e compara em uma lista Python | Poucos documentos, protótipo |
| **Ferramentas prontas** | Upload de arquivos em ChatGPT / Assistants | Sem código ou validação rápida |

---

## 🧩 Exemplo — busca simples por palavra-chave

```python
chunks = texto.split("\n\n")
termos = pergunta.lower().split()
relevantes = [c for c in chunks if any(t in c.lower() for t in termos)][:3]

contexto = "\n\n".join(relevantes)
prompt = f"Contexto:\n{contexto}\n\nPergunta: {pergunta}"
```

| Limitação | Motivo |
| :--- | :--- |
| Não entende sinônimos | "reembolso" ≠ "devolução" |
| Não escala | Varrer todos os chunks a cada pergunta |

---

## ✅ Resumo

- Soluções simples servem para **protótipos** e documentos pequenos.
- Para busca por **significado** e volume maior → embeddings + vector store.
