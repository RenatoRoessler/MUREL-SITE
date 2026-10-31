import { IconeWhatsapp } from "@/components/ui/IconeWhatsapp/IconeWhatsapp";
import { rotuloWhatsapp, urlWhatsapp } from "@/lib/config";
import { Circulo, Flutuante, Rotulo } from "./BotaoWhatsapp.styles";

export function BotaoWhatsapp() {
  return (
    <Flutuante
      href={urlWhatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${rotuloWhatsapp} Falar com a Murel pelo WhatsApp (abre em nova aba)`}
    >
      <Rotulo aria-hidden="true">{rotuloWhatsapp}</Rotulo>
      <Circulo>
        <IconeWhatsapp />
      </Circulo>
    </Flutuante>
  );
}
