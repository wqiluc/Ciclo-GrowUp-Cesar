import secrets

class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///database.db"
    SECRET_KEY = secrets.token_hex(32)
