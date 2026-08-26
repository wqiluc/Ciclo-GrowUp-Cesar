// Migration = versionamento do schema do banco, igual git pra código.
// Cada arquivo descreve como criar (`up`) e desfazer (`down`) uma mudança,
// pra qualquer ambiente chegar no mesmo schema rodando a mesma sequência.
//
// Gerar:   npx knex migrate:make create-usuarios
// Rodar:   npx knex migrate:latest
// Reverter: npx knex migrate:rollback
//
// Exemplo do arquivo gerado em db/migrations/*_create-usuarios.ts:

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void>
{
  await knex.schema.createTable('usuarios', (tabela) =>
  {
    tabela.uuid('id').primary();
    tabela.text('nome').notNullable();
    tabela.text('email').notNullable();
  });
}

export async function down(knex: Knex): Promise<void>
{
  await knex.schema.dropTable('usuarios');
}
