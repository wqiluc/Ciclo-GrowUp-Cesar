// Sem isso, `db('transacoes')` devolve `any` e o autocomplete não sabe
// quais colunas a tabela tem. Ampliando o módulo `knex/types/tables`,
// o Knex passa a tipar `select`, `where` e `insert` por nome de tabela.
//
// Fica num `.d.ts`: com `"type": "module"` no package.json, o resolver
// ESM do TypeScript não acha um subcaminho sem extensão (`knex/types/
// tables`) vindo de um `.ts` comum — só funciona em arquivo de declaração.

interface Transacao
{
  id: string;
  titulo: string;
  valor: number;
  criado_em: string;
}

declare module 'knex/types/tables'
{
  interface Tables
  {
    transacoes: Transacao;
  }
}