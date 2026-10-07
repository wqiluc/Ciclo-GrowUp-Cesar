# pip install openai python-dotenv
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()

SYSTEM = """Você é um treinador de tênis experiente.
Responda sempre em português, para iniciantes, em no máximo 120 palavras.
Formato: tabela markdown (prós, contras, indicado para) + 1 frase de recomendação."""

# few-shot: um exemplo de pergunta/resposta no formato desejado
EXEMPLO = [
    {"role": "user", "content": "Backhand de uma mão x duas mãos"},
    {"role": "assistant", "content": (
        "| | Uma mão | Duas mãos |\n|---|---|---|\n"
        "| Prós | Alcance, slice | Estabilidade, potência |\n"
        "| Contras | Exige força no punho | Menos alcance |\n"
        "| Indicado para | Intermediários | Iniciantes |\n\n"
        "Recomendação: comece com duas mãos."
    )},
]


def perguntar(pergunta: str, temperature: float) -> str:
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=temperature,
        max_tokens=300,
        messages=[{"role": "system", "content": SYSTEM}, *EXEMPLO,
                  {"role": "user", "content": pergunta}],
    )
    return resp.choices[0].message.content


if __name__ == "__main__":
    for t in (0.0, 1.2):
        print(f"\n=== temperature={t} ===")
        print(perguntar("Saque pinpoint x saque plataforma", t))