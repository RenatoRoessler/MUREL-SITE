import { Coluna, Janela } from "./RoloDeDigitos.styles";

type RoloDeDigitosProps = {
  // Um dígito de 0 a 9.
  valor: number;
};

const digitos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Número que rola como um odômetro, do 9 até o valor, quando o bloco em volta aparece na tela. É decorativo
// (aria-hidden): o texto que acompanha o número já diz o valor.
export function RoloDeDigitos({ valor }: RoloDeDigitosProps) {
  return (
    <Janela aria-hidden="true">
      <Coluna $valor={valor}>
        {digitos.map((digito) => (
          <span key={digito}>{digito}</span>
        ))}
      </Coluna>
    </Janela>
  );
}
