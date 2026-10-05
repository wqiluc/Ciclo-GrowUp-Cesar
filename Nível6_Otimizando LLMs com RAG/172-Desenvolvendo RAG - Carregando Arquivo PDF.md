<h1 align="center">📄 Desenvolvendo RAG - Carregando Arquivo PDF</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-PyPDFLoader-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">📌 PyPDFLoader</h2>

```python
def carregar_pdf(caminho: str):
    documentos = PyPDFLoader(caminho).load()  # 1 Document por página
    print(f"{len(documentos)} páginas carregadas")
    return documentos
```

Cada página vira um `Document`:

| Atributo | Conteúdo |
| :--- | :--- |
| `page_content` | Texto extraído da página |
| `metadata` | `{"source": "documento.pdf", "page": 0, ...}` |

> ⚠️ PDFs escaneados (imagem) não têm texto extraível — precisariam de OCR.

---

## ✅ Resumo

- Loader converte o PDF em uma lista de `Document`.
- O `metadata.page` permite citar a **página** da resposta depois.
