import { Simbolo } from "./Simbolo";
import { Logo } from "./LogoMurel.styles";

export function LogoMurel({ tamanho = 24 }: { tamanho?: number }) {
  return (
    <Logo $tamanho={tamanho} aria-label="Murel">
      <Simbolo titulo="Símbolo Murel" />
      <span aria-hidden="true">murel</span>
    </Logo>
  );
}
