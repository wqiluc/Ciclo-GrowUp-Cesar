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


if (__name__ == "__main__"):
    clonar_repo()
    documentos = carregar_codigo()
    print(documentos[0].metadata)
    print(documentos[0].page_content[:300])
