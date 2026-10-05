import os
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()

PDF_PATH = "documento.pdf"
CHROMA_DIR = "chroma_db"

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")


def carregar_pdf(caminho: str):
    documentos = PyPDFLoader(caminho).load()  # 1 Document por página
    print(f"{len(documentos)} páginas carregadas")
    return documentos


def separar_chunks(documentos):
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_documents(documentos)
    print(f"{len(chunks)} chunks gerados")
    return chunks


if (__name__ == "__main__"):
    chunks = separar_chunks(carregar_pdf(PDF_PATH))
    print(chunks[0].page_content)