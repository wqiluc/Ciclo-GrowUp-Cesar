from flask import Flask, jsonify
from http_methods.http_methods import *

application = Flask(__name__)

@application.route("/saudacao/<nome>")
def saudacao(nome):
    return jsonify({"mensagem": f"Olá, {nome}!"})

tasks = [
    {"id": 1, "title": "Estudar Flask", "description": "Aula de CRUD", "completed": False},
    {"id": 2, "title": "Fazer compras", "description": "", "completed": True},
]

@application.route("/tasks/<int:task_id>")

def obter_tarefa(task_id):
    for indice_tarefa, tarefa in enumerate(tasks, start=1):
        if (tarefa["id"] == task_id):
            print(f"{indice_tarefa}")
            return jsonify(tarefa)
        else:
            return jsonify({"erro": "Tarefa não encontrada ❌"}), 404

if (__name__ == "__main__"):
    application.run(debug=True)