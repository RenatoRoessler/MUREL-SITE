import { LogoMurel } from "@/components/brand/LogoMurel";
import { Button } from "@/components/ui/Button/Button";
import { emailContato, numeroWhatsappExibicao, urlAcesso, urlWhatsapp } from "@/lib/config";
import { Acoes, Base, Contato, Linha } from "./Footer.styles";

export function Footer() {
  return (
    <Base>
      <Linha>
        <Contato>
          <LogoMurel />
          <a href={`mailto:${emailContato}`}>{emailContato}</a>
          <a href={urlWhatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp: {numeroWhatsappExibicao}
          </a>
          <a href="#contato">Enviar uma mensagem pelo formulário</a>
        </Contato>
        <Acoes>
          <Button href={urlAcesso} variante="ghost">
            Acessar o sistema
          </Button>
        </Acoes>
      </Linha>
    </Base>
  );
}
