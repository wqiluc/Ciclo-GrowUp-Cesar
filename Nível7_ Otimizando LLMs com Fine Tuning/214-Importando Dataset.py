# pip install datasets pandas
from datasets import load_dataset

DATASET = "hate-speech-portuguese/hate_speech_portuguese"

# O dataset usa um script de loading, que o `datasets` recente não executa mais.
# A branch "refs/convert/parquet" é a versão em Parquet gerada pelo próprio Hub.
dataset = load_dataset(DATASET, revision="refs/convert/parquet")
print(dataset)  # DatasetDict com um único split: "train"

df = dataset["train"].to_pandas()
print(df.shape)
print(df.columns.tolist())

# Para o fine-tuning interessam só o texto e o rótulo (0 = no-hate, 1 = hate)
df = df[["text", "label"]]
df["label"] = df["label"].map({0: "no-hate", 1: "hate"})

print(df.head())
print(df["label"].value_counts())
