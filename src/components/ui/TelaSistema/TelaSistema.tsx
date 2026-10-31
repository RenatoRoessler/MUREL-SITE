import Image, { type StaticImageData } from "next/image";
import { Moldura } from "./TelaSistema.styles";

type TelaSistemaProps = {
  imagem: StaticImageData;
  alt: string;
  sizes?: string;
};

export function TelaSistema({ imagem, alt, sizes = "(min-width: 1024px) 640px, (min-width: 768px) 100vw, 720px" }: TelaSistemaProps) {
  return (
    <Moldura tabIndex={0} aria-label={alt}>
      <Image src={imagem} alt={alt} sizes={sizes} />
    </Moldura>
  );
}
