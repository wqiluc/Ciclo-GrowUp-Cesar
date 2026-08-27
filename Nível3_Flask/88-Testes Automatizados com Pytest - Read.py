import importlib.util
import sys
from pathlib import Path
from Nível3_Flask.CrudFlask.http_methods.http_methods import BASE_URL
import pytest

CRUD_DIR = Path(__file__).parent / "CrudFlask"
READ_FILE = CRUD_DIR / "82-Desenvolvimento do CRUD com Flask - Read - parte 2.py"

sys.path.insert(0, str(CRUD_DIR))

def carregar_app_read():
    spec = importlib.util.spec_from_file_location("crud_read", READ_FILE)
    modulo = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(modulo)
    return modulo.application

@pytest.fixture
def client():
    app = carregar_app_read()
    app.config["TESTING"] = True
    return app.test_client()

def test_listar_todas_as_tarefas(client):
    resposta = client.get("/tasks")

    assert resposta.status_code == 200
    corpo = resposta.get_json()
    assert corpo["total_tasks"] == 2
    assert len(corpo["tasks"]) == 2

def test_filtrar_tarefas_concluidas(client):
    resposta = client.get("/tasks?completed=true")

    corpo = resposta.get_json()
    assert corpo["total_tasks"] == 1
    assert corpo["tasks"][0]["title"] == "Fazer compras"

def test_filtrar_tarefas_nao_concluidas(client):
    resposta = client.get("/tasks?completed=false")

    corpo = resposta.get_json()
    assert corpo["total_tasks"] == 1
    assert corpo["tasks"][0]["title"] == "Estudar Flask"