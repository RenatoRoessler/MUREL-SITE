import { Faixa } from "./FaixaDePista.styles";

// Faixa de pista decorativa que acompanha a rolagem. Não tem conteúdo nem interação.
export function FaixaDePista() {
  return <Faixa aria-hidden="true" data-testid="faixa-de-pista" />;
}
