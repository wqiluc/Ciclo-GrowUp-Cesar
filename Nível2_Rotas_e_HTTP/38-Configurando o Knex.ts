// `npm i knex better-sqlite3`. Knex precisa de um client (o driver real)
// e de onde gravar o arquivo do banco — aqui, sqlite local em disco.

import knexBuilder, { type Knex } from 'knex';

export const configuracaoKnex: Knex.Config = {
  client: 'better-sqlite3',
  connection: {
    filename: './db/app.db',
  },
  useNullAsDefault: true,
};

export const db = knexBuilder(configuracaoKnex);
