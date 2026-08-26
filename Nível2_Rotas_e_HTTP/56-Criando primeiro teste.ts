// Primeiro teste só pra validar a configuração do Vitest: nenhuma
// import da aplicação ainda, só `test` + `expect`. Vitest lê arquivos
// `*.test.ts` / `*.spec.ts` sozinho, sem precisar registrar cada um
// em algum config — roda tudo com `npm run test`.

import { expect, test } from 'vitest';

test('2 + 2 deve ser igual a 4', () =>
{
  expect(2 + 2).toBe(4);
});
