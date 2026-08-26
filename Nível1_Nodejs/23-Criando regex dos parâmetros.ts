// O loop segmento-a-segmento da aula 22 funciona, mas regex faz a
// mesma coisa em uma linha: cada :param vira um grupo nomeado, e o
// match já devolve os valores prontos em .groups.

function construirRegexDaRota(path: string): RegExp
{
  const caminhoComParams = path.replace(/:(\w+)/g, (_, nome) => `(?<${nome}>[^/]+)`);
  return new RegExp(`^${caminhoComParams}(?:\\?(?<query>.*))?$`);
}

const regexUsuario = construirRegexDaRota('/usuarios/:id');
console.log(regexUsuario);
// /^\/usuarios\/(?<id>[^/]+)(?:\?(?<query>.*))?$/

const resultado = regexUsuario.exec('/usuarios/123?ativo=true');
console.log(resultado?.groups); // { id: '123', query: 'ativo=true' }

console.log(regexUsuario.test('/usuarios/123/extra')); // false

const regexSemParam = construirRegexDaRota('/usuarios');
console.log(regexSemParam.test('/usuarios')); // true
console.log(regexSemParam.test('/usuarios/123')); // false