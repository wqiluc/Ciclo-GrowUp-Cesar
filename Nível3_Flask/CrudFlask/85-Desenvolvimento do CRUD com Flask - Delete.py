from flask import Flask, jsonify
from http_methods.http_methods import *

application = Flask(__name__)

tasks = [
    {"id": 1, "title": "Estudar Flask", "description": "Aula de CRUD", "completed": False},
    {"id": 2, "title": "Fazer compras", "description": "", "completed": True},
]

@application.route("/tasks/<int:task_id>", methods=
[
    metodo for indice, metodo in enumerate(http_methods.values(), start=1)
    if (metodo == "DELETE")
])

def deletar_tarefa(task_id):
    for indice_tarefa, tarefa in enumerate(tasks, start=1):
        if (tarefa["id"] == task_id):
            print(f"\n {indice_tarefa}")
            tasks.remove(tarefa)
            return jsonify({"mensagem": "Tarefa deletada com sucesso ✅"})

    return jsonify({"erro": "Tarefa não encontrada ❌"}), 404

if (__name__ == "__main__"):
    application.run(debug=True)