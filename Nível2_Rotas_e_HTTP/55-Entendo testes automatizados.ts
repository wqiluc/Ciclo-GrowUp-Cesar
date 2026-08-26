// Teste automatizado = código que executa o próprio código e confere o
// resultado, sem abrir Insomnia toda vez que algo muda. Continua rodando
// sozinho, no CI, e vira documentação viva do que a aplicação promete.
//
// Pirâmide de testes, da base (mais rápido/barato) pro topo (mais lento/caro):
// - Unitário: testa uma função isolada, sem tocar banco ou rede
// - Integração: testa a rota inteira (fluxo HTTP), pode tocar o banco
// - E2E: testa o sistema completo do ponto de vista do usuário
//
// Aqui: Vitest (test runner, sintaxe parecida com Jest) + Supertest
// (dispara requisição HTTP contra a aplicação sem precisar dela estar
// de pé numa porta real).
//
// `npm i -D vitest supertest @types/supertest`
// script: "test": "vitest run"
