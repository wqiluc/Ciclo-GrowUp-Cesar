import os
from dotenv import load_dotenv
from git import Repo
from langchain_chroma import Chroma
from langchain_community.document_loaders.generic import GenericLoader
from langchain_community.document_loaders.parsers import LanguageParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import Language, RecursiveCharacterTextSplitter
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

load_dotenv()

REPO_URL = "https://github.com/langchain-ai/langchain"
REPO_PATH = "./test_repo"
CHROMA_DIR = "chroma_code_db"


def clonar_repo():
    if not (os.path.isdir(REPO_PATH)):
        Repo.clone_from(REPO_URL, to_path=REPO_PATH, depth=1)


def carregar_codigo():
    loader = GenericLoader.from_filesystem(
        REPO_PATH + "/libs/core/langchain_core/",
        glob="**/*",
        suffixes=[".py"],
        parser=LanguageParser(language=Language.PYTHON, parser_threshold=500),
    )
    documentos = loader.load()
    print(f"{len(documentos)} documentos carregados")
    return documentos


def separar_chunks(documentos):
    python_splitter = RecursiveCharacterTextSplitter.from_language(
        language=Language.PYTHON, chunk_size=2000, chunk_overlap=200
    )
    textos = python_splitter.split_documents(documentos)
    print(f"{len(textos)} chunks gerados")
    return textos


embeddings = OpenAIEmbeddings(disallowed_special=())


def preparar_base():
    if (os.path.isdir(CHROMA_DIR)):
        return Chroma(persist_directory=CHROMA_DIR, embedding_function=embeddings)
    clonar_repo()
    textos = separar_chunks(carregar_codigo())
    return Chroma.from_documents(textos, embeddings, persist_directory=CHROMA_DIR)


def criar_retriever(db):
    return db.as_retriever(search_type="mmr", search_kwargs={"k": 8})


llm = ChatOpenAI(model="gpt-4o-mini", max_tokens=200)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "Você é um revisor de código experiente. Forneça informações detalhadas sobre "
            "a revisão do código e sugestões de melhorias baseado no contexto fornecido abaixo: \n\n{context}",
        ),
        ("user", "{input}"),
    ]
)


def criar_chain(retriever):
    document_chain = create_stuff_documents_chain(llm, prompt)
    return create_retrieval_chain(retriever, document_chain)


def revisar(chain, pergunta: str):
    response = chain.invoke({"input": pergunta})
    fontes = {doc.metadata["source"].replace(REPO_PATH, "") for doc in response["context"]}
    print("Fontes:", *sorted(fontes), sep="\n  ")
    return response["answer"]


if (__name__ == "__main__"):
    chain = criar_chain(criar_retriever(preparar_base()))
    print("RAG Code Review — digite 'sair' para encerrar.")
    pergunta = input("Você: ").strip()
    while not (pergunta.lower() == "sair"):
        if (pergunta):
            print("Bot:", revisar(chain, pergunta))
        pergunta = input("Você: ").strip()
