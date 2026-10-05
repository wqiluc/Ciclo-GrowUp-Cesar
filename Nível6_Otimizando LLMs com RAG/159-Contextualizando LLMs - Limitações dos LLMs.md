<h1 align="center">⚠️ Contextualizando LLMs - Limitações dos LLMs</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Nível_6-Otimizando_LLMs_com_RAG-111827?style=flat-square&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Em_andamento-111827?style=flat-square" />
  <img src="https://img.shields.io/badge/Módulo-RAG_documentos_PDF-111827?style=flat-square" />
</p>

<h2 align="left">📌 O LLM só sabe o que viu no treino</h2>

Um LLM é poderoso, mas o conhecimento dele é **congelado** no momento do treinamento.

| Limitação | O que acontece |
| :--- | :--- |
| **Data de corte** | Não conhece fatos posteriores ao treino |
| **Dados privados** | Nunca viu documentos internos da empresa (contratos, manuais, políticas) |
| **Alucinação** | Quando não sabe, pode **inventar** uma resposta convincente |
| **Sem fonte** | Não diz de onde tirou a informação — difícil de verificar |
| **Generalista** | Sabe um pouco de tudo, mas pode errar em domínios muito específicos |

---

## 🧩 Exemplo

```text
Usuário: Qual é o prazo de reembolso da política interna da minha empresa?
LLM:     "Normalmente o prazo é de 30 dias..."   ← chute genérico (alucinação)
```

O modelo responde com segurança, mas **não tem acesso** ao documento real.

---

## ✅ Resumo

- Conhecimento do LLM é **estático** e **público**.
- Sem os dados certos, ele **alucina**.
- Solução: **dar contexto** ao modelo na hora da pergunta → próxima aula.
