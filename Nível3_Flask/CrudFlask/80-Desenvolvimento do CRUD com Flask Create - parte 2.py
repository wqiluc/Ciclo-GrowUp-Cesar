from flask import Flask, request, jsonify
from http_methods.http_methods import *

application = Flask(__name__)

tasks = []
next_id = 1

@application.route("/tasks", methods=
[
    metodo for indice_metodo, metodo in enumerate(http_methods.values(), start=1)
    if (metodo == "POST")
])

def criar_tarefa():
    global next_id
    dados = request.get_json(silent=True) or {}
    title = dados.get("title")

    if (not title):
        return jsonify({"erro": "O campo 'title' é obrigatório"}), 400

    tarefa = {
        "id": next_id,
        "title": title,
        "description": dados.get("description", ""),
        "completed": False,
    }

    tasks.append(tarefa)
    next_id += 1

    return jsonify(tarefa), 201

if (__name__ == "__main__"):
    application.run(debug=True)