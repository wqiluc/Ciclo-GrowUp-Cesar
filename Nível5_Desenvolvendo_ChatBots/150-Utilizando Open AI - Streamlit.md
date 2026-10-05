<h1 align="center">🎨 Utilizando OpenAI - Streamlit</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_5-Desenvolvendo_ChatBots-111827?style=flat-square&logo=probot&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Streamlit-UI-111827?style=flat-square&logo=streamlit&logoColor=white" />
</p>

<h2 align="left">✨ Melhorando o app</h2>

| Recurso | Código |
| :--- | :--- |
| Config da página | `st.set_page_config(page_title="Pizzaria Bot", page_icon="🍕")` |
| Barra lateral | `with st.sidebar:` |
| Escolher modelo | `st.selectbox("Modelo", ["gpt-4o-mini", "gpt-4o"])` |
| Temperature | `st.slider("Temperature", 0.0, 1.5, 0.7)` |
| Limpar conversa | `if st.button("Nova conversa"): ...` |
| Resposta em tempo real | `stream=True` + `st.write_stream` |

---

## 🧰 Sidebar com configurações

```python
with st.sidebar:
    modelo = st.selectbox("Modelo", ["gpt-4o-mini", "gpt-4o"])
    temperatura = st.slider("Temperature", 0.0, 1.5, 0.7)
    if st.button("🗑️ Nova conversa"):
        st.session_state.mensagens = st.session_state.mensagens[:1]
        st.rerun()
```

---

## ⚡ Streaming da resposta

Em vez de esperar a resposta inteira, o texto aparece aos poucos (como no ChatGPT):

```python
with st.chat_message("assistant"):
    stream = client.chat.completions.create(
        model=modelo,
        messages=st.session_state.mensagens,
        temperature=temperatura,
        stream=True,
    )
    texto = st.write_stream(stream)

st.session_state.mensagens.append({"role": "assistant", "content": texto})
```

> 💡 `st.write_stream` exibe os pedaços conforme chegam e devolve o texto completo para salvar no histórico.

---

## ✅ Resumo

- `st.sidebar` concentra as configurações (modelo, temperature, reset).
- `stream=True` + `st.write_stream` deixam a resposta fluida.
- `st.rerun()` atualiza a tela após limpar o histórico.
