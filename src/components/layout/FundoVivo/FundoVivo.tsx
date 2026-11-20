import { Fundo } from "./FundoVivo.styles";

// Fundo decorativo da página (brilhos e grão). Sem conteúdo e escondido de leitores de tela.
export function FundoVivo() {
  return <Fundo aria-hidden="true" data-testid="fundo-vivo" />;
}
