from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
from langchain_classic.retrievers import ParentDocumentRetriever
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.stores import InMemoryStore
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()

PDF_PATH = "documento.pdf"

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
parent_splitter = RecursiveCharacterTextSplitter(chunk_size=4000, chunk_overlap=200)
child_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=50)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "Você é um assistente que responde perguntas sobre um documento. "
            "Use apenas o contexto abaixo. Se a resposta não estiver nele, diga que não encontrou no documento.\n\n{context}",
        ),
        ("user", "{input}"),
    ]
)


def carregar_pdf(caminho: str):
    documentos = PyPDFLoader(caminho).load()
    print(f"{len(documentos)} páginas carregadas")
    return documentos


def criar_parent_retriever(documentos):
    retriever = ParentDocumentRetriever(
        vectorstore=Chroma(collection_name="child_chunks", embedding_function=embeddings),
        docstore=InMemoryStore(),
        child_splitter=child_splitter,
        parent_splitter=parent_splitter,
    )
    retriever.add_documents(documentos)
    return retriever


def criar_chain(retriever):
    document_chain = create_stuff_documents_chain(llm, prompt)
    return create_retrieval_chain(retriever, document_chain)


if (__name__ == "__main__"):
    chain = criar_chain(criar_parent_retriever(carregar_pdf(PDF_PATH)))
    print(chain.invoke({"input": "Qual é o tema principal do documento?"})["answer"])
