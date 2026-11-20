import type { ReactNode } from "react";
import { Revelar } from "@/components/ui/Revelar/Revelar";
import { Cabecalho, Container, Faixa, Lede, Titulo } from "./Section.styles";

type SectionProps = {
  id: string;
  titulo: string;
  lede?: string;
  // Título e lede entram com fade e subida ao chegar na tela.
  revelar?: boolean;
  children: ReactNode;
};

export function Section({ id, titulo, lede, revelar = false, children }: SectionProps) {
  const idTitulo = `${id}-titulo`;
  const textos = (
    <>
      <Titulo id={idTitulo}>{titulo}</Titulo>
      {lede ? <Lede>{lede}</Lede> : null}
    </>
  );

  return (
    <Faixa id={id} aria-labelledby={idTitulo}>
      <Container>
        {revelar ? (
          <Revelar as={Cabecalho}>{textos}</Revelar>
        ) : (
          <Cabecalho>{textos}</Cabecalho>
        )}
        {children}
      </Container>
    </Faixa>
  );
}
