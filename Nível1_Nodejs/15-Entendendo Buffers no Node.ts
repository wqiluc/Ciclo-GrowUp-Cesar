// Buffer é um array de bytes de tamanho fixo — a forma como o Node
// representa dados binários (o que chega em toda stream, antes de
// virar string). Complementa as aulas 13 e 14, onde já apareceu.

// 1) Criando buffers
const b1 = Buffer.from('olá mundo', 'utf-8');
const b2 = Buffer.alloc(4);          // 4 bytes zerados
const b3 = Buffer.from([72, 105]);   // a partir de bytes -> "Hi"

console.log('from string:', b1);
console.log('alloc(4):   ', b2);
console.log('from bytes: ', b3.toString());

// 2) Buffer vira string só com um encoding explícito
console.log('utf-8:', b1.toString('utf-8'));
console.log('hex:  ', b1.toString('hex'));
console.log('base64:', b1.toString('base64'));

// 3) Tamanho em bytes != tamanho em caracteres (acentos ocupam mais de 1 byte)
const texto = 'ação';
console.log('caracteres:', texto.length, '- bytes:', Buffer.byteLength(texto, 'utf-8'));

// 4) Concatenando vários buffers em um só (é isso que a aula 14 fez com os chunks)
const juntos = Buffer.concat([b1, b3]);
console.log('concat:', juntos.toString());

// 5) Buffers são mutáveis: dá pra escrever direto nos bytes
const mutavel = Buffer.from('abc');
mutavel[0] = 65; // 'A' em ASCII
console.log('mutado:', mutavel.toString());
