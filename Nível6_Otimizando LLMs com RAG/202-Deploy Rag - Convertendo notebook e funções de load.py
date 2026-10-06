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
    return PyPDFLoader(caminho).load()


def criar_retriever(documentos):
    vectorstore = Chroma.from_documents(text_splitter.split_documents(documentos), embeddings)
    return vectorstore.as_retriever(search_kwargs={"k": 3})


# Fora de função: roda uma vez no cold start e é reaproveitado nas próximas invocações
retriever = criar_retriever(carregar_pdf(PDF_PATH))

if (__name__ == "__main__"):
    for doc in retriever.invoke("Qual é o tema principal do documento?"):
        print(f"- pág. {doc.metadata.get('page', 0) + 1}: {doc.page_content[:80]!r}")
