from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader

load_dotenv()

PDF_PATH = "documento.pdf"


def carregar_pdf(caminho: str):
    documentos = PyPDFLoader(caminho).load()  # 1 Document por página
    print(f"{len(documentos)} páginas carregadas")
    return documentos


if (__name__ == "__main__"):
    documentos = carregar_pdf(PDF_PATH)
    print(documentos[0].metadata)
    print(documentos[0].page_content[:300])
