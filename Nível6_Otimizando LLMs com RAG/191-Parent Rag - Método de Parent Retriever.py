from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_classic.retrievers import ParentDocumentRetriever
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.stores import InMemoryStore
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()

PDF_PATH = "documento.pdf"

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
parent_splitter = RecursiveCharacterTextSplitter(chunk_size=4000, chunk_overlap=200)
child_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=50)


def carregar_pdf(caminho: str):
    documentos = PyPDFLoader(caminho).load()
    print(f"{len(documentos)} páginas carregadas")
    return documentos


def criar_parent_retriever(documentos):
    vectorstore = Chroma(collection_name="child_chunks", embedding_function=embeddings)  # children (embeddings)
    store = InMemoryStore()  # parents (texto completo, por id)
    retriever = ParentDocumentRetriever(
        vectorstore=vectorstore,
        docstore=store,
        child_splitter=child_splitter,
        parent_splitter=parent_splitter,
    )
    retriever.add_documents(documentos)
    print(f"{len(list(store.yield_keys()))} parents no docstore")
    return retriever


if (__name__ == "__main__"):
    retriever = criar_parent_retriever(carregar_pdf(PDF_PATH))
    pergunta = "Qual é o tema principal do documento?"

    filhos = retriever.vectorstore.similarity_search(pergunta, k=1)
    print(f"\nChild ({len(filhos[0].page_content)} chars):\n{filhos[0].page_content}")

    pais = retriever.invoke(pergunta)
    print(f"\nParent ({len(pais[0].page_content)} chars):\n{pais[0].page_content[:500]}...")
