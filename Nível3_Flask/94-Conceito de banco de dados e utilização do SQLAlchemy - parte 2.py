import secrets
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from http_methods.http_methods import *

application = Flask(__name__)
application.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
application.config["SECRET_KEY"] = secrets.token_hex(32)

db = SQLAlchemy(application)

class Usuario(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f"<Usuario {self.username}>"

with application.app_context():
    db.create_all()

    if (not Usuario.query.filter_by(username="admin").first()):
        db.session.add(Usuario(username="admin", password="123456"))
        db.session.commit()

    print(Usuario.query.all())

if (__name__ == "__main__"):
    application.run(debug=True)