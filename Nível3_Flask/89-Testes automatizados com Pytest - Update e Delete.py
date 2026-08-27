import importlib.util
import sys
from pathlib import Path
from Nível3_Flask.CrudFlask.http_methods.http_methods import BASE_URL
import pytest

CRUD_DIR = Path(__file__).parent / "CrudFlask"
UPDATE_FILE = CRUD_DIR / "84-Desenvolvimento do CRUD com Flask - Update.py"
DELETE_FILE = CRUD_DIR / "85-Desenvolvimento do CRUD com Flask - Delete.py"

sys.path.insert(0, str(CRUD_DIR))

def carregar_app(arquivo, nome_modulo):
    spec = importlib.util.spec_from_file_location(nome_modulo, arquivo)
    modulo = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(modulo)
    return modulo.application

@pytest.fixture
def client_update():
    app = carregar_app(UPDATE_FILE, "crud_update")
    app.config["TESTING"] = True
    return app.test_client()

@pytest.fixture
def client_delete():
    app = carregar_app(DELETE_FILE, "crud_delete")
    app.config["TESTING"] = True
    return app.test_client()

def test_atualizar_tarefa_com_sucesso(client_update):
    resposta = client_update.put("/tasks/1", json={"title": "Estudar Pytest", "completed": True})

    assert resposta.status_code == 200
    corpo = resposta.get_json()
    assert corpo["title"] == "Estudar Pytest"
    assert corpo["completed"] is True

def test_atualizar_segunda_tarefa(client_update):
    resposta = client_update.put("/tasks/2", json={"description": "Comprar leite"})

    assert resposta.status_code == 200
    assert resposta.get_json()["description"] == "Comprar leite"

def test_atualizar_tarefa_inexistente_retorna_erro(client_update):
    resposta = client_update.put("/tasks/999", json={"title": "Não existe"})

    assert resposta.status_code == 404
    assert resposta.get_json()["erro"] == "Tarefa não encontrada ❌"

def test_deletar_tarefa_com_sucesso(client_delete):
    resposta = client_delete.delete("/tasks/1")

    assert resposta.status_code == 200
    assert resposta.get_json()["mensagem"] == "Tarefa deletada com sucesso ✅"

def test_deletar_segunda_tarefa(client_delete):
    resposta = client_delete.delete("/tasks/2")

    assert resposta.status_code == 200

def test_deletar_tarefa_inexistente_retorna_erro(client_delete):
    resposta = client_delete.delete("/tasks/999")

    assert resposta.status_code == 404
    assert resposta.get_json()["erro"] == "Tarefa não encontrada ❌"