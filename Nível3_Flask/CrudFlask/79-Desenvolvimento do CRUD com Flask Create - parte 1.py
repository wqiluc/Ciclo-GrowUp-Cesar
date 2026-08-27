from flask import Flask, request, jsonify
from http_methods.http_methods import *

application = Flask(__name__)

tasks = []

@application.route("/tasks", methods=
[
    metodo for indice_metodo, metodo in enumerate(http_methods.values(), start=1)
    if (metodo == "POST")
])
def criar_tarefa():
    dados = request.get_json()
    tarefa = {
        "id": len(tasks) + 1,
        "title": dados["title"],
        "description": dados.get("description", ""),
        "completed": False,
    }

    tasks.append(tarefa)
    return jsonify(tarefa)

if (__name__ == "__main__"):
    application.run(debug=True)