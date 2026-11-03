import { enviarContato } from "@/app/contato/actions";
import { Button } from "@/components/ui/Button/Button";
import { IconeWhatsapp } from "@/components/ui/IconeWhatsapp/IconeWhatsapp";
import { Section } from "@/components/ui/Section/Section";
import { urlAdesaoTeste, urlWhatsapp } from "@/lib/config";
import { Divisor, Teste, Whatsapp } from "./Contato.styles";
import { ContatoForm } from "./ContatoForm";

export function Contato() {
  return (
    <Section
      id="contato"
      titulo="Fale com a equipe da Murel"
      lede="Conte sobre o seu pátio e tire dúvidas. A gente responde por e-mail ou telefone."
    >
      <Teste>
        <h3>Prefere testar antes?</h3>
        <p>Use o sistema completo por 30 dias, sem cartão e sem compromisso.</p>
        <Button href={urlAdesaoTeste}>Testar grátis por 30 dias</Button>
      </Teste>
      <Whatsapp>
        <h3>Prefere falar agora?</h3>
        <p>Abra uma conversa com a equipe no WhatsApp.</p>
        <Button href={urlWhatsapp} variante="whatsapp" target="_blank" rel="noopener noreferrer">
          <IconeWhatsapp />
          Chamar no WhatsApp
        </Button>
      </Whatsapp>
      <Divisor>Ou deixe sua mensagem abaixo.</Divisor>
      <ContatoForm acao={enviarContato} />
    </Section>
  );
}
