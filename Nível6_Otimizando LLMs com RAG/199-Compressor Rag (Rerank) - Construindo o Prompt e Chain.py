from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
from langchain_classic.retrievers import ContextualCompressionRetriever
from langchain_cohere import CohereRerank
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()

PDF_PATH = "documento.pdf"

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

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


def criar_rerank_retriever(documentos):
    vectorstore = Chroma.from_documents(
        text_splitter.split_documents(documentos), embeddings, collection_name="rerank_chunks"
    )
    return ContextualCompressionRetriever(
        base_retriever=vectorstore.as_retriever(search_kwargs={"k": 20}),
        base_compressor=CohereRerank(model="rerank-v3.5", top_n=3),
    )


def criar_chain(retriever):
    document_chain = create_stuff_documents_chain(llm, prompt)
    return create_retrieval_chain(retriever, document_chain)


if (__name__ == "__main__"):
    chain = criar_chain(criar_rerank_retriever(carregar_pdf(PDF_PATH)))
    print(chain.invoke({"input": "Qual é o tema principal do documento?"})["answer"])
