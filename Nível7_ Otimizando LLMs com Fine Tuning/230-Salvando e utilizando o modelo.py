# Rodar no Google Colab, logado no Hugging Face (aula 226)
# !pip install -q transformers
from huggingface_hub import whoami
from transformers import pipeline

LOCAL_DIR = "bert-hate-speech-pt"  # salvo pelo trainer.save_model na aula 229
HUB_REPO = f"{whoami()['name']}/bert-hate-speech-pt"

# No mesmo notebook da aula 229 basta: trainer.push_to_hub()
local = pipeline("text-classification", model=LOCAL_DIR)
local.model.push_to_hub(HUB_REPO)
local.tokenizer.push_to_hub(HUB_REPO)

# Carregando direto do Hub, como qualquer outro modelo
classifier = pipeline("text-classification", model=HUB_REPO)

textos = [
    "bom dia a todos, ótima semana!",
    "que jogo incrível ontem, parabéns ao time",
    "esse povo devia sumir do país",
]
for texto, pred in zip(textos, classifier(textos)):
    print(f"{pred['label']:>8} ({pred['score']:.2f})  {texto}")
