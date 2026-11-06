import Image, { type StaticImageData } from "next/image";
import { Base, Corpo, Moldura, Visor } from "./TelaSistema.styles";

type TelaSistemaProps = {
  imagem: StaticImageData;
  alt: string;
  sizes?: string;
};

export function TelaSistema({ imagem, alt, sizes = "(min-width: 1024px) 640px, (min-width: 768px) 100vw, 720px" }: TelaSistemaProps) {
  const retrato = imagem.height > imagem.width;

  return (
    <Moldura>
      <Corpo $retrato={retrato}>
        <Visor tabIndex={0} role="group" aria-label={alt} $retrato={retrato}>
          <Image src={imagem} alt={alt} sizes={sizes} />
        </Visor>
      </Corpo>
      {retrato ? null : <Base aria-hidden="true" />}
    </Moldura>
  );
}
