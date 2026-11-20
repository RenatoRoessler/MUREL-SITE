import { LogoMurel } from "@/components/brand/LogoMurel";
import { Button } from "@/components/ui/Button/Button";
import {
  emailContato,
  numeroWhatsappExibicao,
  urlAcesso,
  urlAdesao,
  urlPrivacidade,
  urlTermos,
  urlWhatsapp,
} from "@/lib/config";
import { Acoes, Base, Coluna, Contato, Grade, Links, Titulo } from "./Footer.styles";

const secoes = [
  { href: "#sistema", rotulo: "Sistema" },
  { href: "#como-funciona", rotulo: "Como funciona" },
  { href: "#planos", rotulo: "Planos" },
  { href: "#perguntas", rotulo: "Perguntas" },
  { href: "#contato", rotulo: "Contato" },
];

type FooterProps = {
  // Endereços das páginas de termos e privacidade; sem eles, a coluna "Legal" não aparece.
  enderecoDosTermos?: string | null;
  enderecoDaPrivacidade?: string | null;
};

export function Footer({ enderecoDosTermos = urlTermos, enderecoDaPrivacidade = urlPrivacidade }: FooterProps) {
  const temLegal = Boolean(enderecoDosTermos || enderecoDaPrivacidade);

  return (
    <Base id="rodape">
      <Grade>
        <Contato>
          <LogoMurel />
          <a href={`mailto:${emailContato}`}>{emailContato}</a>
          <a href={urlWhatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp: {numeroWhatsappExibicao}
          </a>
          <a href="#contato">Enviar uma mensagem pelo formulário</a>
        </Contato>

        <Coluna as="nav" aria-label="Seções da página no rodapé">
          <Titulo>Seções</Titulo>
          <Links>
            {secoes.map((secao) => (
              <li key={secao.href}>
                <a href={secao.href}>{secao.rotulo}</a>
              </li>
            ))}
          </Links>
        </Coluna>

        {temLegal ? (
          <Coluna as="nav" aria-label="Documentos legais">
            <Titulo>Legal</Titulo>
            <Links>
              {enderecoDosTermos ? (
                <li>
                  <a href={enderecoDosTermos}>Termos de uso</a>
                </li>
              ) : null}
              {enderecoDaPrivacidade ? (
                <li>
                  <a href={enderecoDaPrivacidade}>Política de privacidade</a>
                </li>
              ) : null}
            </Links>
          </Coluna>
        ) : null}

        <Coluna>
          <Titulo>Ações</Titulo>
          <Acoes>
            <Button href={urlAdesao}>Ir para adesão</Button>
            <Button href={urlAcesso} variante="ghost">
              Acessar o sistema
            </Button>
          </Acoes>
        </Coluna>
      </Grade>
    </Base>
  );
}
