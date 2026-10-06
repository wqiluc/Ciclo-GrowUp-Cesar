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


if (__name__ == "__main__"):
    clonar_repo()
    textos = separar_chunks(carregar_codigo())
    print(textos[0].metadata)
    print(textos[0].page_content[:300])
