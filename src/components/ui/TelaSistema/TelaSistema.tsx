import Image, { type StaticImageData } from "next/image";
import { CamadaViva } from "@/components/ui/CamadaViva/CamadaViva";
import type { EventoVivo } from "@/types/sistema";
import { Base, Corpo, Moldura, Visor } from "./TelaSistema.styles";

type TelaSistemaProps = {
  imagem: StaticImageData;
  alt: string;
  sizes?: string;
  // Imagem acima da dobra (ex.: o topo da página): carrega com prioridade para não atrasar a primeira tela.
  prioridade?: boolean;
  // O visor é focável para rolar telas largas pelo teclado. Telas em retrato não rolam: pode desligar o foco.
  focavel?: boolean;
  // Acontecimentos decorativos sobre a tela (só em telas em retrato, onde a imagem cabe inteira).
  vida?: EventoVivo[];
};

export function TelaSistema({
  imagem,
  alt,
  sizes = "(min-width: 1024px) 640px, (min-width: 768px) 100vw, 720px",
  prioridade = false,
  focavel = true,
  vida,
}: TelaSistemaProps) {
  const retrato = imagem.height > imagem.width;

  return (
    <Moldura>
      <Corpo $retrato={retrato}>
        <Visor {...(focavel ? { tabIndex: 0, role: "group", "aria-label": alt } : {})} $retrato={retrato}>
          <Image src={imagem} alt={alt} sizes={sizes} priority={prioridade} />
        </Visor>
        {retrato ? <CamadaViva eventos={vida} /> : null}
      </Corpo>
      {retrato ? null : <Base aria-hidden="true" />}
    </Moldura>
  );
}
