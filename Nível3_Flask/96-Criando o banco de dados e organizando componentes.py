from flask import Flask
from config import Config
from database import db
from routes import registrar_rotas
from http_methods.http_methods import *

application = Flask(__name__)
application.config.from_object(Config)

db.init_app(application)
registrar_rotas(application)

with application.app_context():
    db.create_all()

if (__name__ == "__main__"):
    application.run(debug=True)

# flask shell abre um python shell já com o app_context ativo, útil pra
# testar queries sem precisar do print(Usuario.query.all()) nem subir o server:
# $ export FLASK_APP=96-Criando\ o\ banco\ de\ dados\ e\ organizando\ componentes.py
# $ flask shell
# >>> from models import Usuario
# >>> Usuario.query.all()