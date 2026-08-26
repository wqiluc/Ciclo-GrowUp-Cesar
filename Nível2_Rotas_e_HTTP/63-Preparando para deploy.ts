// Sqlite grava num arquivo em disco — funciona local, mas a maioria dos
// hosts (Vercel incluso) não persiste disco entre deploys/execuções.
// Produção precisa de um banco de verdade (Postgres); dev continua em
// sqlite. `DATABASE_CLIENT` escolhe o driver, `DATABASE_URL` serve pros
// dois casos: caminho de arquivo num, connection string no outro.

import 'dotenv/config';
import { z } from 'zod';
import type { Knex } from 'knex';

const esquemaEnv = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']).default('sqlite'),
  DATABASE_URL: z.string(),
});

const env = esquemaEnv.parse(process.env);

export const configuracaoKnex: Knex.Config = {
  client: env.DATABASE_CLIENT === 'sqlite' ? 'better-sqlite3' : 'pg',
  connection:
    env.DATABASE_CLIENT === 'sqlite' ? { filename: env.DATABASE_URL } : env.DATABASE_URL,
  useNullAsDefault: env.DATABASE_CLIENT === 'sqlite',
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
};

// produção: `npm i pg`, e no .env do host, `DATABASE_CLIENT=pg` +
// `DATABASE_URL=postgres://usuario:senha@host:porta/banco`.
