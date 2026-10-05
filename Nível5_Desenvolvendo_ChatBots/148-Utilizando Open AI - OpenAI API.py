from openai import OpenAI

client = OpenAI()

historico = [
    {"role": "system", "content": "Você é um atendente de pizzaria, educado e direto."}
]


def responder(pergunta: str) -> str:
    historico.append({"role": "user", "content": pergunta})
    resposta = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=historico,
        temperature=0.7,
    )
    texto = resposta.choices[0].message.content
    historico.append({"role": "assistant", "content": texto})
    return texto


if (__name__ == "__main__"):
    print("Pizzaria Bot — digite 'sair' para encerrar.")
    pergunta = input("Você: ").strip()
    while not (pergunta.lower() == "sair"):
        if (pergunta):
            print("Bot:", responder(pergunta))
        pergunta = input("Você: ").strip()
