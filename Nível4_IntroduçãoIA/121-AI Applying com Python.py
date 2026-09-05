import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])


def perguntar(pergunta: str) -> str:
    resposta = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": pergunta}],
    )
    return resposta.choices[0].message.content


if __name__ == "__main__":
    print(perguntar("Explique o que é AI Applying em uma frase."))
