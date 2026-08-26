// req.url mistura path e query string ("?chave=valor"), e caminhos
// como /usuarios/:id têm um pedaço dinâmico que o === da aula 21 não
// captura. Isolando os dois problemas aqui antes de resolver com
// regex na próxima aula.

// Route parameters => parte da URL (ex: :id em /usuarios/:id)
// Query parameters => depois do "?" (ex: ?search=ana)

function separarQuery(url: string)
{
  const [pathname, querystring] = url.split('?');
  const query = new URLSearchParams(querystring ?? '');
  return { pathname, query };
}

console.log(separarQuery('/usuarios?search=ana'));
// { pathname: '/usuarios', query: URLSearchParams { 'search' => 'ana' } }

// Tentativa ingênua de casar /usuarios/:id contra /usuarios/123:
// comparar segmento por segmento.
function casaCaminhoIngenuo(padrao: string, pathname: string): Record<string, string> | null
{
  const segmentosPadrao = padrao.split('/');
  const segmentosUrl = pathname.split('/');

  if (segmentosPadrao.length !== segmentosUrl.length)
  {
    return null;
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < segmentosPadrao.length; i++)
  {
    const segmentoPadrao = segmentosPadrao[i];
    const segmentoUrl = segmentosUrl[i];

    if (segmentoPadrao.startsWith(':'))
    {
      params[segmentoPadrao.slice(1)] = segmentoUrl;
      continue;
    }

    if (segmentoPadrao !== segmentoUrl)
    {
      return null;
    }
  }

  return params;
}

console.log(casaCaminhoIngenuo('/usuarios/:id', '/usuarios/123')); // { id: '123' }
console.log(casaCaminhoIngenuo('/usuarios/:id', '/usuarios/123/extra')); // null

// Funciona, mas repetir esse loop pra cada rota é trabalho manual
// que regex resolve em uma linha — próxima aula.