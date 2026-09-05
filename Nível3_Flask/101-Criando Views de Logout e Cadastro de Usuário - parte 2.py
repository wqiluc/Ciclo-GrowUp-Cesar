from functools import wraps
from flask import request, jsonify, session
from database import db
from models import Usuario

def login_required(view):
    @wraps(view)
    def wrapper(*args, **kwargs):
        if (not session.get("usuario_id")):
            return jsonify({"erro": "Autenticação necessária"}), 401
        return view(*args, **kwargs)
    return wrapper

def registrar_rotas(application):
    @application.route("/user", methods=["POST"])
    def cadastrar_usuario():
        dados = request.get_json(silent=True) or dict()
        username = dados.get("username")
        senha = dados.get("password")

        if (not username or not senha):
            return jsonify({"erro": "username e password são obrigatórios"}), 400

        if (len(senha) < 6):
            return jsonify({"erro": "password deve ter ao menos 6 caracteres"}), 400

        if (Usuario.query.filter_by(username=username).first()):
            return jsonify({"erro": "Usuário já existe"}), 409

        usuario = Usuario(username=username)
        usuario.set_senha(senha)
        db.session.add(usuario)
        db.session.commit()

        # cadastro já efetua o login, evitando um segundo request
        session["usuario_id"] = usuario.id
        return jsonify(usuario.to_dict()), 201

    @application.route("/login", methods=["POST"])
    def login():
        dados = request.get_json(silent=True) or dict()
        username = dados.get("username")
        senha = dados.get("password")

        usuario = Usuario.query.filter_by(username=username).first()

        if (not usuario or not usuario.verificar_senha(senha)):
            return jsonify({"erro": "Credenciais inválidas"}), 401

        session["usuario_id"] = usuario.id
        return jsonify({"mensagem": f"Bem-vindo, {usuario.username}"}), 200

    @application.route("/logout", methods=["POST"])
    @login_required
    def logout():
        session.pop("usuario_id", None)
        return jsonify({"mensagem": "Sessão encerrada"}), 200

    @application.route("/perfil", methods=["GET"])
    @login_required
    def perfil():
        usuario = Usuario.query.get(session["usuario_id"])
        return jsonify(usuario.to_dict()), 200
