from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_classic.retrievers import ContextualCompressionRetriever
from langchain_cohere import CohereRerank
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


def criar_rerank_retriever(vectorstore):
    base_retriever = vectorstore.as_retriever(search_kwargs={"k": 20})  # busca ampla (recall)
    compressor = CohereRerank(model="rerank-v3.5", top_n=3)  # cross-encoder (precisão)
    return ContextualCompressionRetriever(
        base_retriever=base_retriever,
        base_compressor=compressor,
    )


if (__name__ == "__main__"):
    vectorstore = criar_vectorstore(separar_chunks(carregar_pdf(PDF_PATH)))
    retriever = criar_rerank_retriever(vectorstore)
    pergunta = "Qual é o tema principal do documento?"

    print("\nSó busca vetorial (top 3):")
    for doc in vectorstore.similarity_search(pergunta, k=3):
        print(f"- pág. {doc.metadata.get('page', 0) + 1}: {doc.page_content[:80]!r}")

    print("\nCom rerank (top 3 de 20):")
    for doc in retriever.invoke(pergunta):
        print(f"- pág. {doc.metadata.get('page', 0) + 1} | score {doc.metadata['relevance_score']:.3f}: {doc.page_content[:80]!r}")
