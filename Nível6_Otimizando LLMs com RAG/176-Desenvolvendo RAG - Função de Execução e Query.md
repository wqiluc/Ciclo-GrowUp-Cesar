<h1 align="center">▶️ Desenvolvendo RAG - Função de Execução e Query</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-RAG-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">📌 Preparar a base só uma vez</h2>

```python
def preparar_base():
    if (os.path.isdir(CHROMA_DIR)):
        return Chroma(persist_directory=CHROMA_DIR, embedding_function=embeddings)
    return salvar_vetores(separar_chunks(carregar_pdf(PDF_PATH)))


def executar(chain, pergunta: str) -> str:
    return chain.invoke(pergunta)
```

Se `chroma_db/` já existe, reaproveita; senão, faz a indexação completa.

> ⚠️ Trocou o PDF? Apague `chroma_db/` para reindexar.

---

## 💬 Loop de perguntas

```python
vectorstore = preparar_base()
chain = criar_chain(vectorstore)
pergunta = input("Você: ").strip()
while not (pergunta.lower() == "sair"):
    if (pergunta):
        print("Bot:", executar(chain, pergunta))
    pergunta = input("Você: ").strip()
```

```bash
python "176-Desenvolvendo RAG - Função de Execução e Query.py"
```

---

## ✅ Resumo

- Indexação roda **uma vez**; consultas reutilizam o banco salvo.
- `executar` é o ponto de entrada da query.
