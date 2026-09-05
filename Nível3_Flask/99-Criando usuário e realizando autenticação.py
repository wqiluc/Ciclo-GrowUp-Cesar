import requests

BASE_URL = "http://127.0.0.1:5000"

sessao = requests.Session()

cadastro = sessao.post(f"{BASE_URL}/user", json={"username": "cesar", "password": "senha123"})
print("cadastro:", cadastro.status_code, cadastro.json())

login = sessao.post(f"{BASE_URL}/login", json={"username": "cesar", "password": "senha123"})
print("login:", login.status_code, login.json())

# sessao reaproveita o cookie de sessão retornado pelo /login
perfil = sessao.get(f"{BASE_URL}/perfil")
print("perfil:", perfil.status_code, perfil.json())
