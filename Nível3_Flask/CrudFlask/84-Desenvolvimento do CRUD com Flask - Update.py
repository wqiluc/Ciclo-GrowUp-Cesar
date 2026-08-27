from flask import Flask, request, jsonify
from http_methods.http_methods import *

application = Flask(__name__)

tasks = [
    {"id": 1, "title": "Estudar Flask", "description": "Aula de CRUD", "completed": False},
    {"id": 2, "title": "Fazer compras", "description": "", "completed": True},
]

@application.route("/tasks/<int:task_id>", methods=
[
    metodo for indice_metodo, metodo in enumerate(http_methods.values(), start=1)
    if (metodo == "PUT")
])

def atualizar_tarefa(task_id):
    dados = request.get_json(silent=True) or dict()

    for indice_tarefa, tarefa in enumerate(tasks, start=1):
        if (tarefa["id"] == task_id):
            print(f"\n {indice_tarefa}")
            tarefa["title"] = dados.get("title", tarefa["title"])
            tarefa["description"] = dados.get("description", tarefa["description"])
            tarefa["completed"] = dados.get("completed", tarefa["completed"])
            return jsonify(tarefa)

    return jsonify({"erro": "Tarefa não encontrada ❌"}), 404

if (__name__ == "__main__"):
    application.run(debug=True)