class Database
{
  #dados: Map<string, any[]> = new Map();

  select(tabela: string, busca?: Record<string, any>): any[]
  {
    const registros = this.#dados.get(tabela) ?? [];

    if (!busca)
    {
      return registros;
    }

    return registros.filter((registro) =>
      Object.entries(busca).every(([chave, valor]) => registro[chave] === valor)
    );
  }

  insert(tabela: string, registro: any): any
  {
    const registros = this.#dados.get(tabela) ?? [];
    registros.push(registro);
    this.#dados.set(tabela, registros);
    return registro;
  }

  update(tabela: string, id: string, dados: Record<string, any>): any
  {
    const registros = this.#dados.get(tabela) ?? [];
    const indice = registros.findIndex((registro) => registro.id === id);

    if (indice === -1)
    {
      throw new Error(`Registro ${id} não encontrado em ${tabela}`);
    }

    registros[indice] = { ...registros[indice], ...dados };
    return registros[indice];
  }

  delete(tabela: string, id: string): void
  {
    const registros = this.#dados.get(tabela) ?? [];
    const indice = registros.findIndex((registro) => registro.id === id);

    if (indice === -1)
    {
      throw new Error(`Registro ${id} não encontrado em ${tabela}`);
    }

    registros.splice(indice, 1);
  }
}

const db = new Database();

db.insert('usuarios', { id: '1', nome: 'Cesar' });
db.insert('usuarios', { id: '2', nome: 'Ana' });
console.log('todos:', db.select('usuarios'));

db.update('usuarios', '1', { nome: 'Cesar Escola' });
console.log('depois do update:', db.select('usuarios', { id: '1' }));

db.delete('usuarios', '2');
console.log('depois do delete:', db.select('usuarios'));