# Tasks para os agentes da aula 238
import runpy
from pathlib import Path

from crewai import Task

BASE_DIR = Path(__file__).parent
agents = runpy.run_path(str(BASE_DIR / "238-Criando agentes.py"))

pesquisa = Task(
    description="Pesquise sobre {tema}. Traga definições, exemplos de uso e limitações.",
    expected_output="Lista em tópicos com 5 a 8 fatos, cada um com 1 frase.",
    agent=agents["pesquisador"],
)

artigo = Task(
    description="Usando a pesquisa, escreva um artigo curto sobre {tema}.",
    expected_output="Artigo em markdown com título, 3 seções e conclusão (máx. 300 palavras).",
    agent=agents["redator"],
    context=[pesquisa],  # recebe a saída da pesquisa
    output_file=str(BASE_DIR / "output" / "artigo.md"),
)
