// db/migrations/*_create-transacoes.ts — tabela central da API: cada
// transação tem valor com sinal (positivo = crédito, negativo = débito),
// então o saldo vira só a soma da coluna `valor`.

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void>
{
  await knex.schema.createTable('transacoes', (tabela) =>
  {
    tabela.uuid('id').primary();
    tabela.text('titulo').notNullable();
    tabela.decimal('valor', 10, 2).notNullable();
    tabela.timestamp('criado_em').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void>
{
  await knex.schema.dropTable('transacoes');
}
