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

def preparar_base():
    if (os.path.isdir(CHROMA_DIR)):
        return Chroma(persist_directory=CHROMA_DIR, embedding_function=embeddings)
    return salvar_vetores(separar_chunks(carregar_pdf(PDF_PATH)))


def executar(chain, pergunta: str) -> str:
    return chain.invoke(pergunta)


def chunks_relevantes(vectorstore, pergunta: str, k: int = 4):
    for doc, score in vectorstore.similarity_search_with_score(pergunta, k=k):
        pagina = doc.metadata.get("page", 0) + 1
        print(f"[pág. {pagina} | distância {score:.3f}] {doc.page_content[:120]}...")


if (__name__ == "__main__"):
    vectorstore = preparar_base()
    chain = criar_chain(vectorstore)
    print("RAG PDF — digite 'sair' para encerrar.")
    pergunta = input("Você: ").strip()
    while not (pergunta.lower() == "sair"):
        if (pergunta):
            chunks_relevantes(vectorstore, pergunta)
            print("Bot:", executar(chain, pergunta))
        pergunta = input("Você: ").strip()