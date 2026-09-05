# troca de SQLite por MySQL: só muda a URI e o driver, o resto do projeto
# (models.py, database.py, routes.py) continua igual — é a mesma API do
# SQLAlchemy por cima de bancos diferentes.
#
# $ pip install pymysql
# $ mysql -u root -p -e "CREATE DATABASE growup_cesar CHARACTER SET utf8mb4;"

import secrets

class Config:
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://usuario:senha@localhost/growup_cesar"
    SECRET_KEY = secrets.token_hex(32)

# usuario, senha e o nome do banco variam por ambiente — em produção isso
# vem de variável de ambiente, nunca hardcoded no config.py
