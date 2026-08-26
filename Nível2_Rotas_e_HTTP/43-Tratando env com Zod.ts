// `process.env` é `string | undefined` pra tudo — Zod valida o formato
// (número, enum, obrigatório) e falha rápido, na subida do app, em vez
// de deixar um valor errado estourar em algum ponto aleatório depois.

import 'dotenv/config';
import { z } from 'zod';

const esquemaEnv = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3339),
  DATABASE_URL: z.string(),
});

const resultado = esquemaEnv.safeParse(process.env);

if (!resultado.success)
{
  console.error('variáveis de ambiente inválidas:', resultado.error.format());
  throw new Error('variáveis de ambiente inválidas');
}

export const env = resultado.data;
