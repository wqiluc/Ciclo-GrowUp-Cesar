<h1 align="center">✂️ Desenvolvendo a Solução - Separando documentos em Chunks</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-Language_Splitter-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">📌 Splitter por linguagem</h2>

```python
python_splitter = RecursiveCharacterTextSplitter.from_language(
    language=Language.PYTHON, chunk_size=2000, chunk_overlap=200
)

texts = python_splitter.split_documents(documents)
len(texts)  # 1278
```

`from_language` usa separadores da sintaxe Python, em ordem de prioridade:

```python
RecursiveCharacterTextSplitter.get_separators_for_language(Language.PYTHON)
# ['\nclass ', '\ndef ', '\n\tdef ', '\n\n', '\n', ' ', '']
```

| Parâmetro | Valor | Por quê |
| :--- | :---: | :--- |
| `chunk_size` | 2000 | Código precisa de mais contexto que texto corrido (no PDF foi 1000) |
| `chunk_overlap` | 200 | Mantém continuidade entre chunks vizinhos |

> 💡 Tenta cortar primeiro em `class`, depois em `def`, e só em último caso no meio de linhas — os chunks ficam com funções inteiras.

---

## ✅ Resumo

- `from_language(Language.PYTHON)` = splitter que respeita a estrutura do código.
- Código: [182-...Separando documentos em Chunks.py](182-Desenvolvendo%20a%20Solução%20-%20Separando%20documentos%20em%20Chunks.py)
