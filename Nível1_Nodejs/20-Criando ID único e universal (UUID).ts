// Até aqui os ids eram passados na mão. Um UUID (Universally Unique
// Identifier) é gerado sozinho e, na prática, nunca colide — insert()
// deixa de exigir id de quem chama e gera um via randomUUID().

import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const CAMINHO_DB = path.join(process.cwd(), 'db.json');

class Database
{
  #dados: Map<string, any[]>;

  constructor()
  {
    if (fs.existsSync(CAMINHO_DB))
    {
      const conteudo = fs.readFileSync(CAMINHO_DB, 'utf-8');
      this.#dados = new Map(Object.entries(JSON.parse(conteudo)));
    }

    else
    {
      this.#dados = new Map();
    }
  }

  #persistir(): void
  {
    fs.writeFileSync(CAMINHO_DB, JSON.stringify(Object.fromEntries(this.#dados), null, 2));
  }

  // Post
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

  // Get
  insert(tabela: string, dados: Record<string, any>): any
  {
    const registro = { id: randomUUID(), ...dados };
    const registros = this.#dados.get(tabela) ?? [];
    registros.push(registro);
    this.#dados.set(tabela, registros);
    this.#persistir();
    return registro;
  }

  // Patch
  update(tabela: string, id: string, dados: Record<string, any>): any
  {
    const registros = this.#dados.get(tabela) ?? [];
    const indice = registros.findIndex((registro) => registro.id === id);

    if (indice === -1)
    {
      throw new Error(`Registro ${id} não encontrado em ${tabela}`);
    }

    registros[indice] = { ...registros[indice], ...dados };
    this.#persistir();
    return registros[indice];
  }

  // Delete
  delete(tabela: string, id: string): void
  {
    const registros = this.#dados.get(tabela) ?? [];
    const indice = registros.findIndex((registro) => registro.id === id);

    if (indice === -1)
    {
      throw new Error(`Registro ${id} não encontrado em ${tabela}`);
    }

    registros.splice(indice, 1);
    this.#persistir();
  }
}

const db = new Database();

const usuarios = [];

for (let i = 0; i < 5; i++)
{
  usuarios.push(db.insert('usuarios', { nome: `Usuario ${i}` }));
}

console.log('IDs gerados:', usuarios.map((usuario) => usuario.id));

db.update('Usúarios', usuarios[0].id, { nome: 'Usuario 1 Atualizado' });
console.log('Usúario atualizado:', db.select('usuarios', { id: usuarios[0].id }));

db.delete('Usúarios', usuarios[4].id);
console.log('Usúarios restantes:', db.select('usuarios'));