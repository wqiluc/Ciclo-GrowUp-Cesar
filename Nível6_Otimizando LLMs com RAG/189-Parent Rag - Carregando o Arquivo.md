<h1 align="center">📄 Parent Rag - Carregando o Arquivo</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-Parent_RAG-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">📂 Carregando o PDF</h2>

```python
PDF_PATH = "documento.pdf"

def carregar_pdf(caminho: str):
    documentos = PyPDFLoader(caminho).load()  # 1 Document por página
    print(f"{len(documentos)} páginas carregadas")
    return documentos
```

| Campo | Conteúdo |
| :--- | :--- |
| `page_content` | Texto da página |
| `metadata["source"]` | Caminho do arquivo |
| `metadata["page"]` | Número da página (começa em **0**) |

> 💡 Mesmo loader da aula 172. Os metadados passam para os parents e children, então dá para saber de qual página veio a resposta.

---

## ✅ Resumo

- `PyPDFLoader(...).load()` → lista de `Document`, um por página.
- Código: [189-...Carregando o Arquivo.py](189-Parent%20Rag%20-%20Carregando%20o%20Arquivo.py)
