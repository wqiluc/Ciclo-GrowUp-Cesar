# streamlit run "150-Utilizando Open AI - Streamlit.py"
import streamlit as st
from openai import OpenAI

st.set_page_config(page_title="Pizzaria Bot", page_icon="🍕")
st.title("🍕 Pizzaria Bot")

client = OpenAI(api_key=st.secrets["OPENAI_API_KEY"])

if "mensagens" not in st.session_state:
    st.session_state.mensagens = [
        {"role": "system", "content": "Você é um atendente de pizzaria, educado e direto."}
    ]

with st.sidebar:
    modelo = st.selectbox("Modelo", ["gpt-4o-mini", "gpt-4o"])
    temperatura = st.slider("Temperature", 0.0, 1.5, 0.7)
    if st.button("🗑️ Nova conversa"):
        st.session_state.mensagens = st.session_state.mensagens[:1]
        st.rerun()

for indice_msg, msg in enumerate(st.session_state.mensagens[1:], start=1):
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

if pergunta := st.chat_input("Digite sua mensagem"):
    st.session_state.mensagens.append({"role": "user", "content": pergunta})
    with st.chat_message("user"):
        st.markdown(pergunta)

    with st.chat_message("assistant"):
        stream = client.chat.completions.create(
            model=modelo,
            messages=st.session_state.mensagens,
            temperature=temperatura,
            stream=True,
        )
        texto = st.write_stream(stream)

    st.session_state.mensagens.append({"role": "assistant", "content": texto})