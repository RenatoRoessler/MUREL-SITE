import { enviarContato } from "@/app/contato/actions";
import { Button } from "@/components/ui/Button/Button";
import { IconeWhatsapp } from "@/components/ui/IconeWhatsapp/IconeWhatsapp";
import { Section } from "@/components/ui/Section/Section";
import { urlAdesaoTeste, urlWhatsapp } from "@/lib/config";
import { botaoTeste, fraseTesteContato } from "@/lib/planos/textos";
import type { TesteGratis } from "@/types/plano";
import { Divisor, Teste, Whatsapp } from "./Contato.styles";
import { ContatoForm } from "./ContatoForm";

type ContatoProps = {
  teste: TesteGratis | null;
};

export function Contato({ teste }: ContatoProps) {
  return (
    <Section
      id="contato"
      titulo="Fale com a equipe da Murel"
      lede="Conte sobre o seu pátio e tire dúvidas. A gente responde por e-mail ou telefone."
    >
      <Teste>
        <h3>Prefere testar antes?</h3>
        <p>{fraseTesteContato(teste)}</p>
        <Button href={urlAdesaoTeste}>{botaoTeste(teste)}</Button>
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
