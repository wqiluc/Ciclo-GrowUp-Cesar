<h1 align="center">📄 Compressor Rag (Rerank) - Carregando Arquivos</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-Rerank_RAG-111827?style=flat-square&logo=python&logoColor=white" />
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

> 💡 Mesmo loader das aulas 172 e 189. O rerank não muda nada na ingestão, só na consulta.

---

## ✅ Resumo

- `PyPDFLoader(...).load()` → lista de `Document`, um por página.
- Código: [196-...Carregando Arquivos.py](196-Compressor%20Rag%20(Rerank)%20-%20Carregando%20Arquivos.py)
