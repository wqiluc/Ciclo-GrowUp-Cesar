import importlib.util
import sys
from pathlib import Path
from Nível3_Flask.CrudFlask.http_methods.http_methods import BASE_URL
import pytest

CRUD_DIR = Path(__file__).parent / "CrudFlask"
CREATE_FILE = CRUD_DIR / "80-Desenvolvimento do CRUD com Flask Create - parte 2.py"

sys.path.insert(0, str(CRUD_DIR))

def carregar_app_create():
    spec = importlib.util.spec_from_file_location("crud_create", CREATE_FILE)
    modulo = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(modulo)
    return modulo.application

@pytest.fixture
def client():
    app = carregar_app_create()
    app.config["TESTING"] = True
    return app.test_client()

def test_criar_tarefa_com_sucesso(client):
    resposta = client.post("/tasks", json={"title": "Estudar Pytest", "description": "Aula 87"})

    assert resposta.status_code == 201
    corpo = resposta.get_json()
    assert corpo["id"] == 1
    assert corpo["title"] == "Estudar Pytest"
    assert corpo["description"] == "Aula 87"
    assert corpo["completed"] is False

def test_criar_tarefa_sem_description(client):
    resposta = client.post("/tasks", json={"title": "Sem descrição"})

    assert resposta.status_code == 201
    assert resposta.get_json()["description"] == ""

def test_criar_tarefa_sem_title_retorna_erro(client):
    resposta = client.post("/tasks", json={"description": "Falta o título"})

    assert resposta.status_code == 400
    assert resposta.get_json()["erro"] == "O campo 'title' é obrigatório"

def test_ids_incrementam_a_cada_tarefa(client):
    client.post("/tasks", json={"title": "Primeira"})
    resposta = client.post("/tasks", json={"title": "Segunda"})

    assert resposta.get_json()["id"] == 2