// Três formas de falar com o banco, do mais próximo do SQL ao mais distante:
//
// 1. Driver nativo (ex: `better-sqlite3`, `pg`) — SQL puro, controle total,
//    zero abstração; qualquer erro de sintaxe só aparece em runtime.
// 2. Query builder (ex: Knex) — monta o SQL a partir de métodos encadeados,
//    troca de banco (sqlite/postgres/mysql) sem reescrever queries.
// 3. ORM (ex: Prisma) — mapeia tabelas para classes/objetos, mais mágica,
//    menos controle sobre o SQL gerado.
//
// Este projeto segue com Knex: SQL continua visível e legível, mas sem
// concatenar strings à mão nem se prender a um único banco.
