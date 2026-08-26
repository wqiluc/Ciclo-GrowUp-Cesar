// ============================================================
// O QUE É O NODE.JS?
// ============================================================
//
// Node.js NÃO é uma linguagem de programação. É um AMBIENTE DE
// EXECUÇÃO (runtime) para JavaScript fora do navegador.
//
// Antes do Node existir, JavaScript só rodava dentro de um browser
// (Chrome, Firefox, etc), porque era o browser quem dava a ele
// acesso a coisas como o DOM, requisições HTTP, etc.
//
// O Node pegou o motor V8 (o mesmo motor que roda JS dentro do
// Google Chrome) e o colocou para rodar direto no sistema
// operacional, fora do navegador. Com isso, JavaScript passou a
// poder ser usado para:
//   - Criar servidores web (como o Express, Fastify, NestJS)
//   - Ler e escrever arquivos no computador
//   - Acessar bancos de dados
//   - Rodar scripts de linha de comando (CLI)
//   - Criar APIs backend
//
// Em resumo: Node.js = motor V8 (JavaScript) + APIs extras do
// sistema operacional (arquivos, rede, processos, etc).

// ------------------------------------------------------------
// CARACTERÍSTICAS PRINCIPAIS
// ------------------------------------------------------------
//
// 1) Single-threaded (uma única thread principal)
//    O Node executa o código em uma única linha de execução,
//    mas consegue lidar com várias tarefas "ao mesmo tempo"
//    graças ao Event Loop.
//
// 2) Não-bloqueante / Assíncrono (Non-blocking I/O)
//    Operações demoradas (ler arquivo, chamar API, consultar banco)
//    não travam o programa. O Node manda a tarefa para ser feita
//    "em segundo plano" e continua executando o resto do código.
//    Quando a tarefa termina, uma função de callback/Promise é
//    chamada com o resultado.
//
// 3) Orientado a eventos (Event-driven)
//    Muita coisa no Node funciona escutando eventos (ex: uma
//    requisição chegando no servidor, um arquivo terminando de
//    ser lido).
//
// 4) NPM (Node Package Manager)
//    Vem junto com o Node. É o gerenciador de pacotes/bibliotecas
//    que permite instalar código de terceiros (ex: npm install express).

// ------------------------------------------------------------
// COMO ISSO SE TRADUZ EM JS (.js)?
// ------------------------------------------------------------
//
// Este arquivo está em TypeScript (.ts), que é um SUPERSET do
// JavaScript: ou seja, todo código JS válido também é TS válido,
// mas o TS adiciona TIPAGEM ESTÁTICA (tipos) por cima.
//
// O Node.js, por padrão, NÃO entende TypeScript diretamente.
// Ele só executa JavaScript puro. Por isso, código .ts precisa
// ser "traduzido" (compilado/transpilado) para .js antes de rodar
// — isso é feito pelo compilador do TypeScript (tsc) ou por
// ferramentas como ts-node, esbuild, swc, etc.
//
// Exemplo de código em TypeScript:

function somar(a: number, b: number): number 
{
  return a + b;
}

// Ao compilar esse .ts para .js, o TypeScript REMOVE as anotações
// de tipo (: number) porque JavaScript não sabe o que fazer com
// tipos — ele não tem esse conceito em tempo de execução.
//
// O resultado em JavaScript puro (o que o Node de fato executa)
// fica assim:
//
//   function somar(a, b) {
//     return a + b;
//   }
//
// Ou seja: TypeScript é só uma "camada de segurança" usada durante
// o DESENVOLVIMENTO (ajuda a evitar erros, dá autocomplete, etc).
// Quando chega a hora de RODAR o código, tudo vira JavaScript puro,
// que é a única linguagem que o Node.js (e o motor V8) entendem.

console.log(somar(2, 3)); // 5