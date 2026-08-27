from flask import Flask, jsonify
from http_methods.http_methods import *

application = Flask(__name__)

tasks = [
    {"id": 1, "title": "Estudar Flask", "description": "Aula de CRUD", "completed": False},
    {"id": 2, "title": "Fazer compras", "description": "", "completed": True},
]

@application.route("/tasks", methods=
[
    metodo for indice_metodo, metodo in enumerate(http_methods.values(), start=1)
    if (metodo == "GET")
])

def listar_tarefas():
    return jsonify({"tasks": tasks, "total_tasks": len(tasks[0:])})

if (__name__ == "__main__"):
    application.run(debug=True)