import type { ReactNode } from "react";
import { Cabecalho, Container, Faixa, Lede, Titulo } from "./Section.styles";

type SectionProps = {
  id: string;
  titulo: string;
  lede?: string;
  children: ReactNode;
};

export function Section({ id, titulo, lede, children }: SectionProps) {
  const idTitulo = `${id}-titulo`;

  return (
    <Faixa id={id} aria-labelledby={idTitulo}>
      <Container>
        <Cabecalho>
          <Titulo id={idTitulo}>{titulo}</Titulo>
          {lede ? <Lede>{lede}</Lede> : null}
        </Cabecalho>
        {children}
      </Container>
    </Faixa>
  );
}
