import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_URL = os.getenv("RAG_API_URL", "http://<dns-do-alb>/")


def perguntar(pergunta: str) -> dict:
    resposta = requests.post(API_URL, json={"pergunta": pergunta}, timeout=120)
    resposta.raise_for_status()
    return resposta.json()


if (__name__ == "__main__"):
    print("RAG na AWS — digite 'sair' para encerrar.")
    pergunta = input("Você: ").strip()
    while not (pergunta.lower() == "sair"):
        if (pergunta):
            dados = perguntar(pergunta)
            print("Bot:", dados["resposta"], f"(págs. {dados['paginas']})")
        pergunta = input("Você: ").strip()