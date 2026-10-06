# Rodar no Google Colab (Ambiente de execução → T4 GPU)
# !pip install -q transformers datasets evaluate accelerate
import torch
from google.colab import userdata
from huggingface_hub import login, whoami

print("GPU:", torch.cuda.get_device_name(0) if torch.cuda.is_available() else "não encontrada (rodando em CPU)")

# Token Write criado em huggingface.co/settings/tokens e salvo em Secrets como HF_TOKEN
login(token=userdata.get("HF_TOKEN"))
print("Logado como:", whoami()["name"])
