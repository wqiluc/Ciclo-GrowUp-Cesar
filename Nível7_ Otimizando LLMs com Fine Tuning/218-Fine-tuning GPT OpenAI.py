# pip install openai python-dotenv
import runpy
import time
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
TRAIN_FILE = DATA_DIR / "train.jsonl"
MODEL_FILE = DATA_DIR / "fine_tuned_model.txt"

BASE_MODEL = "gpt-4o-mini-2024-07-18"  # fine-tuning exige o snapshot com data

# Reaproveita o pipeline da aula 217 caso o JSONL ainda não exista
if not TRAIN_FILE.exists():
    runpy.run_path(str(BASE_DIR / "217-Finalizando Dataset.py"))

client = OpenAI()

# 1. Upload do dataset
with open(TRAIN_FILE, "rb") as f:
    train_file = client.files.create(file=f, purpose="fine-tune")
print("Arquivo enviado:", train_file.id)

# 2. Criação do job
job = client.fine_tuning.jobs.create(
    model=BASE_MODEL,
    training_file=train_file.id,
    suffix="hate-speech-pt",
)
print("Job criado:", job.id)

# 3. Acompanhando até terminar (validating_files → queued → running → succeeded)
while job.status not in ("succeeded", "failed", "cancelled"):
    time.sleep(30)
    job = client.fine_tuning.jobs.retrieve(job.id)
    events = client.fine_tuning.jobs.list_events(job.id, limit=1)
    ultimo = events.data[0].message if events.data else ""
    print(f"[{job.status}] {ultimo}")

if job.status != "succeeded":
    raise SystemExit(f"Fine-tuning terminou com status {job.status}: {job.error}")

# 4. Guardando o nome do modelo para a aula 219
MODEL_FILE.write_text(job.fine_tuned_model)
print("Modelo:", job.fine_tuned_model)
print("Tokens treinados:", job.trained_tokens)
