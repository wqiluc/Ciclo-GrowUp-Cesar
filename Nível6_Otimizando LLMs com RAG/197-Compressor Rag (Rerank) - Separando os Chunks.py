from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()

PDF_PATH = "documento.pdf"

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)


def carregar_pdf(caminho: str):
    documentos = PyPDFLoader(caminho).load()
    print(f"{len(documentos)} páginas carregadas")
    return documentos


def separar_chunks(documentos):
    chunks = text_splitter.split_documents(documentos)
    print(f"{len(chunks)} chunks gerados")
    return chunks


def criar_vectorstore(chunks):
    return Chroma.from_documents(chunks, embeddings, collection_name="rerank_chunks")


if (__name__ == "__main__"):
    chunks = separar_chunks(carregar_pdf(PDF_PATH))
    print(f"Tamanho médio: {sum(len(c.page_content) for c in chunks) / len(chunks):.0f} chars")
    vectorstore = criar_vectorstore(chunks)
    print(f"{vectorstore._collection.count()} vetores no Chroma")
