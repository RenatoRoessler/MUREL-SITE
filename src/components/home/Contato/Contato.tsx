import { enviarContato } from "@/app/contato/actions";
import { Section } from "@/components/ui/Section/Section";
import { ContatoForm } from "./ContatoForm";

export function Contato() {
  return (
    <Section
      id="contato"
      titulo="Fale com a equipe da Murel"
      lede="Conte sobre o seu pátio e tire dúvidas, inclusive sobre preço. A gente responde por e-mail ou telefone."
    >
      <ContatoForm acao={enviarContato} />
    </Section>
  );
}
