<h1 align="center">🖌️ Art Executor Agent</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_8-Agentes_de_IA-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/AutoGen_Studio-Art_Executor-111827?style=flat-square&logo=microsoft&logoColor=white" />
</p>

<h2 align="left">🎯 Objetivo</h2>

Criar o agente que **gera a imagem**, usando uma **skill** (tool) de geração de imagens.

---

## 🛠️ Skill de geração de imagem

O Studio já vem com a skill `generate_images` (DALL·E). Uma versão equivalente:

```python
import base64
from pathlib import Path

from openai import OpenAI


def generate_image(prompt: str, filename: str = "arte.png") -> str:
    """Gera uma imagem a partir de um prompt em inglês e salva em disco. Retorna o caminho."""
    result = OpenAI().images.generate(model="gpt-image-1", prompt=prompt, size="1024x1024")
    path = Path(filename)
    path.write_bytes(base64.b64decode(result.data[0].b64_json))
    return f"Imagem salva em {path.resolve()}"
```

> Assim como no CrewAI, **nome + docstring + type hints** são o que o LLM lê para decidir como chamar.

---

## 🖌️ Configuração no Studio

| Campo | Valor |
| :--- | :--- |
| Name | `art_executor` |
| Description | Executor que gera imagens a partir do prompt do diretor de arte |
| Model | `gpt-4o-mini` |
| Skills / Tools | `generate_images` |

**System message:**

```text
Você gera imagens. Use a tool de geração com o prompt exato enviado pelo art_director.
Depois de gerar, informe o caminho do arquivo e peça a revisão do art_director.
Não invente um prompt novo sem pedido do diretor.
```

---

## ✅ Resumo

- `art_executor` = AssistantAgent **com** a skill de imagem.
- A skill é uma função Python comum, com docstring e tipos.
- Ele executa; quem decide se ficou bom é o `art_director`.
