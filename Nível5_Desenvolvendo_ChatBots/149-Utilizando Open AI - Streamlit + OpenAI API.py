# streamlit run "149-Utilizando Open AI - Streamlit + OpenAI API.py"
import streamlit as st
from openai import OpenAI

st.title("🍕 Pizzaria Bot")

client = OpenAI(api_key=st.secrets["OPENAI_API_KEY"])

if "mensagens" not in st.session_state:
    st.session_state.mensagens = [
        {"role": "system", "content": "Você é um atendente de pizzaria, educado e direto."}
    ]

for indice_msg, msg in enumerate(st.session_state.mensagens[1:], start=1):
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

if pergunta := st.chat_input("Digite sua mensagem"):
    st.session_state.mensagens.append({"role": "user", "content": pergunta})
    with st.chat_message("user"):
        st.markdown(pergunta)

    resposta = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=st.session_state.mensagens,
    )
    texto = resposta.choices[0].message.content

    st.session_state.mensagens.append({"role": "assistant", "content": texto})
    with st.chat_message("assistant"):
        st.markdown(texto)