# pip install datasets pandas scikit-learn
from datasets import load_dataset
from sklearn.model_selection import train_test_split

DATASET = "hate-speech-portuguese/hate_speech_portuguese"

dataset = load_dataset(DATASET, revision="refs/convert/parquet")
df = dataset["train"].to_pandas()[["text", "label"]]
df["label"] = df["label"].map({0: "no-hate", 1: "hate"})

# O dataset só tem o split "train", então separamos treino e teste na mão.
# stratify mantém a mesma proporção hate/no-hate nos dois conjuntos.
train_df, test_df = train_test_split(
    df,
    test_size=0.2,
    stratify=df["label"],
    random_state=42,
)

print(f"Treino: {len(train_df)} | Teste: {len(test_df)}")
print(train_df["label"].value_counts(normalize=True).round(3))
print(test_df["label"].value_counts(normalize=True).round(3))
