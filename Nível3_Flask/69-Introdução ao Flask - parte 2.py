from flask import Flask, render_template, request

application = Flask(__name__)

@application.route("/")
def index():
    return render_template("./templates/index.html")

@application.route("/sobre")
def sobre():
    return render_template("./templates/sobre.html")

METODOS_HTTP = [
    ("GET", "Buscar dados"),
    ("POST", "Enviar dados"),
    ("PATCH", "Atualizar dados"),
    ("DELETE", "Remover dados"),
]

@application.route("/contato", methods=[metodo for metodo, metodo in METODOS_HTTP])
def contato():
    mensagem = ...
    if (request.method == "POST"):
        mensagem = request.form.get("mensagem")
    return render_template("contato.html", mensagem=mensagem.capitalize())

if __name__ == "__main__":
    application.run(debug=True)