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


def salvar_vetores(chunks):
    return Chroma.from_documents(chunks, embeddings, persist_directory=CHROMA_DIR)


prompt = ChatPromptTemplate.from_template(
    """Você é um assistente que responde perguntas sobre um documento.
Use apenas o contexto abaixo. Se a resposta não estiver nele, diga que não encontrou no documento.

Contexto:
{context}

Pergunta: {question}"""
)


def formatar_docs(docs) -> str:
    return "\n\n".join(doc.page_content for doc in docs)


def criar_chain(vectorstore):
    retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
    return (
        {"context": retriever | formatar_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )


if (__name__ == "__main__"):
    vectorstore = salvar_vetores(separar_chunks(carregar_pdf(PDF_PATH)))
    chain = criar_chain(vectorstore)
    print(chain.invoke("Sobre o que é este documento?"))