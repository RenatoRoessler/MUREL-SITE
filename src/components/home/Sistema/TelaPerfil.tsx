import { TelaSistema } from "@/components/ui/TelaSistema/TelaSistema";
import type { TelaPerfil as TelaPerfilDados } from "@/types/sistema";
import { Explicacao, Imagem, Slide, Texto, Titulo } from "./TelaPerfil.styles";

type TelaPerfilProps = {
  tela: TelaPerfilDados;
};

export function TelaPerfil({ tela }: TelaPerfilProps) {
  const retrato = tela.imagem.height > tela.imagem.width;
  const sizes = retrato ? "300px" : "(min-width: 1024px) 640px, (min-width: 768px) 100vw, 720px";

  return (
    <Slide $retrato={retrato}>
      <Imagem $retrato={retrato}>
        <TelaSistema imagem={tela.imagem} alt={tela.alt} sizes={sizes} />
      </Imagem>
      <Texto>
        <Titulo>{tela.titulo}</Titulo>
        <Explicacao>{tela.explicacao}</Explicacao>
      </Texto>
    </Slide>
  );
}
