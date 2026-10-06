<h1 align="center">📂 Introdução e Setup do Projeto - Carregando o Código</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-GenericLoader-111827?style=flat-square&logo=python&logoColor=white" />
</p>

<h2 align="left">🐙 Clonando o repositório</h2>

```python
repo_path = "./test_repo"
repo = Repo.clone_from("https://github.com/langchain-ai/langchain", to_path=repo_path)
```

> ⚠️ `clone_from` falha se a pasta já existir — no `.py` só clona se `test_repo/` não existir.

---

## 📂 Carregando os arquivos `.py`

```python
loader = GenericLoader.from_filesystem(
    repo_path + "/libs/core/langchain_core/",
    glob="**/*",
    suffixes=[".py"],
    parser=LanguageParser(language=Language.PYTHON, parser_threshold=500),
)
documents = loader.load()
```

| Parâmetro | Função |
| :--- | :--- |
| `glob="**/*"` | Percorre todas as subpastas |
| `suffixes=[".py"]` | Só arquivos Python |
| `LanguageParser(language=...)` | Separa cada **função/classe** de topo em um `Document` |
| `parser_threshold=500` | Arquivos com menos de 500 linhas não são divididos |

Cada `Document` traz no `metadata` o `source` (arquivo), `content_type` (`functions_classes` ou `simplified_code`) e `language`.

---

## ✅ Resumo

- `GenericLoader` + `LanguageParser` = loader de código que respeita a estrutura.
- Só a pasta `langchain_core` é indexada para manter a base pequena.
- Código: [181-...Carregando o Código.py](181-%20Introdução%20e%20Setup%20do%20Projeto%20-%20Carregando%20o%20Código.py)
