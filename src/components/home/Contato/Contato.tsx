import { enviarContato } from "@/app/contato/actions";
import { Button } from "@/components/ui/Button/Button";
import { IconeWhatsapp } from "@/components/ui/IconeWhatsapp/IconeWhatsapp";
import { Section } from "@/components/ui/Section/Section";
import { emailContato, urlAdesaoTeste, urlWhatsapp } from "@/lib/config";
import { fraseTesteContato } from "@/lib/planos/textos";
import type { TesteGratis } from "@/types/plano";
import { AbasContato } from "./AbasContato";
import { Whatsapp } from "./Contato.styles";
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
      <AbasContato
        rotulo="Formas de falar com a Murel"
        abas={[
          {
            id: "mensagem",
            rotulo: "Escrever mensagem",
            conteudo: <ContatoForm acao={enviarContato} />,
          },
          {
            id: "whatsapp",
            rotulo: "Falar agora",
            conteudo: (
              <Whatsapp>
                <h3>Prefere falar agora?</h3>
                <p>Abra uma conversa com a equipe no WhatsApp.</p>
                <Button href={urlWhatsapp} variante="whatsapp" target="_blank" rel="noopener noreferrer">
                  <IconeWhatsapp />
                  Chamar no WhatsApp
                </Button>
                <p>
                  Ou escreva para <a href={`mailto:${emailContato}`}>{emailContato}</a>.
                </p>
              </Whatsapp>
            ),
          },
          {
            id: "teste",
            rotulo: "Ver funcionando",
            conteudo: (
              <Whatsapp>
                <h3>Prefere ver funcionando no seu pátio?</h3>
                <p>{fraseTesteContato(teste)}</p>
                <Button href={urlAdesaoTeste}>Começar grátis</Button>
              </Whatsapp>
            ),
          },
        ]}
      />
    </Section>
  );
}
