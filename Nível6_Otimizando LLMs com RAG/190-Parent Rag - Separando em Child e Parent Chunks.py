from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()

PDF_PATH = "documento.pdf"

parent_splitter = RecursiveCharacterTextSplitter(chunk_size=4000, chunk_overlap=200)
child_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=50)


def carregar_pdf(caminho: str):
    documentos = PyPDFLoader(caminho).load()
    print(f"{len(documentos)} páginas carregadas")
    return documentos


if (__name__ == "__main__"):
    documentos = carregar_pdf(PDF_PATH)
    parents = parent_splitter.split_documents(documentos)
    children = child_splitter.split_documents(parents)
    print(f"{len(parents)} parent chunks | {len(children)} child chunks")
    print(f"~{len(children) / len(parents):.1f} children por parent")
