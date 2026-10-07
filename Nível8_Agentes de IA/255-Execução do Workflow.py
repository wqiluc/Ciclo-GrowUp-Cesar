# pip install "autogen-agentchat" "autogen-ext[openai]" python-dotenv
# Versão em código do workflow montado no AutoGen Studio (aulas 251–255)
import asyncio
import base64
from pathlib import Path

from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.conditions import MaxMessageTermination, TextMentionTermination
from autogen_agentchat.teams import SelectorGroupChat
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient
from dotenv import load_dotenv
from openai import AsyncOpenAI

load_dotenv()

OUTPUT_DIR = Path(__file__).parent / "output"
OUTPUT_DIR.mkdir(exist_ok=True)


async def generate_image(prompt: str, filename: str = "arte.png") -> str:
    """Gera uma imagem a partir de um prompt em inglês e salva em disco. Retorna o caminho."""
    result = await AsyncOpenAI().images.generate(model="gpt-image-1", prompt=prompt, size="1024x1024")
    path = OUTPUT_DIR / filename
    path.write_bytes(base64.b64decode(result.data[0].b64_json))
    return f"Imagem salva em {path}"


async def main() -> None:
    model_client = OpenAIChatCompletionClient(model="gpt-4o-mini")

    art_director = AssistantAgent(
        "art_director",
        model_client=model_client,
        description="Diretor de arte que define o conceito visual e escreve o prompt da imagem.",
        system_message=(
            "Você é um diretor de arte. A partir do pedido, defina conceito, estilo, paleta, "
            "composição e escreva um PROMPT de imagem em inglês, detalhado. Não gere imagens. "
            "Quando a imagem gerada estiver de acordo com o conceito, responda APROVADO."
        ),
    )

    art_executor = AssistantAgent(
        "art_executor",
        model_client=model_client,
        description="Executor que gera imagens a partir do prompt do diretor de arte.",
        tools=[generate_image],
        system_message=(
            "Você gera imagens. Use a tool com o prompt exato enviado pelo art_director, "
            "informe o caminho do arquivo e peça a revisão do art_director."
        ),
    )

    team = SelectorGroupChat(
        [art_director, art_executor],
        model_client=model_client,  # LLM escolhe quem fala (speaker selection "auto")
        termination_condition=TextMentionTermination("APROVADO") | MaxMessageTermination(10),
    )

    await Console(team.run_stream(
        task="Crie um banner para a newsletter de ações do Lucas, minimalista, tons de azul, com um gráfico em alta."
    ))
    await model_client.close()


if __name__ == "__main__":
    asyncio.run(main())
