import base64
import json
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()

PDF_PATH = "documento.pdf"

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "Você é um assistente que responde perguntas sobre um documento. "
            "Use apenas o contexto abaixo. Se a resposta não estiver nele, diga que não encontrou no documento.\n\n{context}",
        ),
        ("user", "{input}"),
    ]
)


def carregar_pdf(caminho: str):
    return PyPDFLoader(caminho).load()


def criar_retriever(documentos):
    vectorstore = Chroma.from_documents(text_splitter.split_documents(documentos), embeddings)
    return vectorstore.as_retriever(search_kwargs={"k": 3})


def criar_chain(retriever):
    return create_retrieval_chain(retriever, create_stuff_documents_chain(llm, prompt))


chain = criar_chain(criar_retriever(carregar_pdf(PDF_PATH)))


def response(pergunta: str) -> dict:
    resultado = chain.invoke({"input": pergunta})
    return {
        "pergunta": pergunta,
        "resposta": resultado["answer"],
        "paginas": sorted({doc.metadata.get("page", 0) + 1 for doc in resultado["context"]}),
    }


def resposta_http(status: int, corpo: dict) -> dict:
    return {
        "statusCode": status,
        "statusDescription": f"{status}",
        "isBase64Encoded": False,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(corpo, ensure_ascii=False),
    }


def lambda_handler(event, context):
    body = event.get("body") or "{}"
    if (event.get("isBase64Encoded")):
        body = base64.b64decode(body).decode("utf-8")

    pergunta = json.loads(body).get("pergunta", "").strip()
    if not (pergunta):
        return resposta_http(400, {"erro": "Campo 'pergunta' é obrigatório"})
    return resposta_http(200, response(pergunta))


if (__name__ == "__main__"):
    evento_alb = {"body": json.dumps({"pergunta": "Qual é o tema principal do documento?"}), "isBase64Encoded": False}
    print(lambda_handler(evento_alb, None))