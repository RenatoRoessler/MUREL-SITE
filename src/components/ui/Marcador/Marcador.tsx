import { normalizarTexto } from "@/components/home/Faq/Faq.data";
import { Marca } from "./Marcador.styles";

export type Trecho = { texto: string; destaque: boolean };

// Divide o texto em trechos, marcando os que casam com o termo sem diferenciar maiúsculas nem acentos. A busca é
// feita no texto normalizado e as posições voltam para o texto original, que é o que aparece na tela.
export function trechosDestacados(texto: string, termo: string): Trecho[] {
  const buscado = normalizarTexto(termo.trim());
  if (buscado === "") return [{ texto, destaque: false }];

  // mapa[i] = posição, no texto original, do caractere i do texto normalizado.
  const mapa: number[] = [];
  let normalizado = "";
  let posicao = 0;
  for (const caractere of texto) {
    const parte = normalizarTexto(caractere);
    for (let i = 0; i < parte.length; i += 1) mapa.push(posicao);
    normalizado += parte;
    posicao += caractere.length;
  }

  const trechos: Trecho[] = [];
  let cursor = 0;
  let achado = normalizado.indexOf(buscado);

  while (achado !== -1) {
    const inicio = mapa[achado];
    const ultimo = mapa[achado + buscado.length - 1];
    const fim = ultimo + (texto.codePointAt(ultimo)! > 0xffff ? 2 : 1);
    if (inicio > cursor) trechos.push({ texto: texto.slice(cursor, inicio), destaque: false });
    trechos.push({ texto: texto.slice(inicio, fim), destaque: true });
    cursor = fim;
    achado = normalizado.indexOf(buscado, achado + buscado.length);
  }

  if (cursor < texto.length) trechos.push({ texto: texto.slice(cursor), destaque: false });
  return trechos;
}

type MarcadorProps = {
  texto: string;
  termo: string;
};

// Texto com o termo buscado destacado por um marca-texto (<mark>). Sem termo, é o próprio texto.
export function Marcador({ texto, termo }: MarcadorProps) {
  const trechos = trechosDestacados(texto, termo);
  if (trechos.length === 1 && !trechos[0].destaque) return <>{texto}</>;

  return (
    <>
      {trechos.map((trecho, indice) =>
        trecho.destaque ? <Marca key={indice}>{trecho.texto}</Marca> : trecho.texto,
      )}
    </>
  );
}
