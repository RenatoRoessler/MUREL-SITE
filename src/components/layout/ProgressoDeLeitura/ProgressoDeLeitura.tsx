import { Linha } from "./ProgressoDeLeitura.styles";

// Barra de progresso de leitura da página. Decorativa: sem conteúdo e escondida de leitores de tela.
export function ProgressoDeLeitura() {
  return <Linha aria-hidden="true" data-testid="progresso-de-leitura" />;
}
