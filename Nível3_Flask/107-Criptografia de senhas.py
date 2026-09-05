from werkzeug.security import generate_password_hash, check_password_hash

senha = "senha123"

hash1 = generate_password_hash(senha)
hash2 = generate_password_hash(senha)

print(hash1)
print(hash2)
print(hash1 == hash2)  # False: cada hash usa um salt aleatório novo

print(check_password_hash(hash1, senha))     # True: senha bate com o hash
print(check_password_hash(hash1, "errada"))  # False

# é por isso que set_senha/verificar_senha (models.py) nunca comparam a
# senha em texto puro — comparam o hash, que muda a cada chamada mas
# ainda valida contra a senha original
