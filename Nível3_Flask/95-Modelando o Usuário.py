import secrets
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from http_methods.http_methods import *

application = Flask(__name__)
application.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
application.config["SECRET_KEY"] = secrets.token_hex(32)

db = SQLAlchemy(application)

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    senha_hash = db.Column(db.String(256), nullable=False)

    def set_senha(self, senha):
        self.senha_hash = generate_password_hash(senha)

    def verificar_senha(self, senha):
        return check_password_hash(self.senha_hash, senha)

    def to_dict(self):
        return {"id": self.id, "username": self.username}

    def __repr__(self):
        return f"<Usuario {self.username}>"

with application.app_context():
    db.create_all()

    if (not Usuario.query.filter_by(username="admin").first()):
        admin = Usuario(username="admin")
        admin.set_senha("123456")
        db.session.add(admin)
        db.session.commit()

    print(Usuario.query.all())

if (__name__ == "__main__"):
    application.run(debug=True)