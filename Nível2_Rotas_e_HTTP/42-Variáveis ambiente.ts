// Configuração que muda por ambiente (porta, string de conexão, chaves)
// não deve ficar hardcoded nem versionada — vai num `.env` (fora do git,
// listado no `.gitignore`) e é carregada em `process.env`.
//
// confira a .env

import 'dotenv/config';

const ambiente = process.env.NODE_ENV || 'dev';
const porta = Number(process.env.PORT) || 3000;

console.log(`ambiente: ${ambiente}`);
console.log(`porta configurada: ${porta} 🚪`);
console.log(`banco configurado: ${process.env.DATABASE_URL} ❤️`);
