<h1 align="center">🦜 Preparando ambiente - Introduzindo LangChain e LlamaIndex</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-LangChain-111827?style=flat-square&logo=langchain&logoColor=white" />
</p>

<h2 align="left">📌 Frameworks para RAG</h2>

Ambos abstraem loaders, splitters, embeddings, vector stores e LLMs — evitando escrever tudo do zero.

| | LangChain | LlamaIndex |
| :--- | :--- | :--- |
| Foco | Orquestração geral de apps com LLM (chains, agentes, ferramentas) | **Indexação e busca** em dados para RAG |
| Abstração principal | **Chains** / LCEL (`prompt \| llm \| parser`) | **Index** + **Query Engine** |
| Flexibilidade | Muito alta, mais código | Mais "pronto", menos código para RAG |
| Integrações | Centenas (loaders, bancos, modelos) | Muitas, focadas em dados |

---

## 🧩 Mesmo RAG nos dois

```python
# LlamaIndex
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

docs = SimpleDirectoryReader("pdfs").load_data()
index = VectorStoreIndex.from_documents(docs)
print(index.as_query_engine().query("Qual o prazo de reembolso?"))
```

```python
# LangChain (visão geral — construído no resto do módulo)
docs = PyPDFLoader("documento.pdf").load()
chunks = splitter.split_documents(docs)
retriever = Chroma.from_documents(chunks, embeddings).as_retriever()
chain = {"context": retriever, "question": RunnablePassthrough()} | prompt | llm
```

> 💡 No curso o projeto segue com **LangChain**, que deixa cada etapa visível.

---

## ✅ Resumo

- **LangChain**: orquestração flexível; **LlamaIndex**: RAG mais direto.
- Os dois resolvem o mesmo problema com abstrações diferentes.
