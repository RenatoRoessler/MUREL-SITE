"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { LogoMurel, type LogoHandle } from "@/components/brand/LogoMurel";
import { Button } from "@/components/ui/Button/Button";
import { urlAcesso, urlAdesaoTeste } from "@/lib/config";
import {
  AcessoDesktop,
  Acoes,
  Barra,
  BotaoMenu,
  Linha,
  LinkAcessoMenu,
  LinkSecao,
  Marca,
  Navegacao,
  PularConteudo,
} from "./Header.styles";

const secoes = [
  { href: "#sistema", rotulo: "Sistema" },
  { href: "#como-funciona", rotulo: "Como funciona" },
  { href: "#planos", rotulo: "Planos" },
  { href: "#perguntas", rotulo: "Perguntas" },
  { href: "#contato", rotulo: "Contato" },
];

// Quanto a página precisa rolar para o header ganhar fundo.
const ROLAGEM_PARA_FUNDO_PX = 8;

function assinarRolagem(avisar: () => void) {
  window.addEventListener("scroll", avisar, { passive: true });
  return () => window.removeEventListener("scroll", avisar);
}

// Boolean primitivo: o React só renderiza de novo quando o valor muda, não a cada pixel rolado.
const lerRolado = () => window.scrollY > ROLAGEM_PARA_FUNDO_PX;
const lerRoladoNoServidor = () => false;

export function Header() {
  const [aberto, setAberto] = useState(false);
  const rolado = useSyncExternalStore(assinarRolagem, lerRolado, lerRoladoNoServidor);
  const fechar = () => setAberto(false);
  const logoRef = useRef<LogoHandle>(null);

  return (
    <>
      <PularConteudo href="#conteudo">Ir para o conteúdo</PularConteudo>
      <Barra $rolado={rolado}>
        <Linha>
          {/* O logo anima ao abrir a página. Hover e foco param a animação; durante ela, o clique (ou toque) só
              para, sem seguir o link. Parado, o link leva ao topo como sempre. */}
          <Marca
            href="#topo"
            aria-label="Murel, início da página"
            onPointerEnter={(evento) => {
              if (evento.pointerType === "mouse") logoRef.current?.parar();
            }}
            onFocus={() => logoRef.current?.parar()}
            onClick={(evento) => {
              if (logoRef.current?.parar()) evento.preventDefault();
            }}
          >
            <LogoMurel ref={logoRef} animado pararAoInteragir={false} />
          </Marca>

          <Navegacao id="menu-principal" aria-label="Seções da página" $aberto={aberto}>
            {secoes.map((secao) => (
              <LinkSecao key={secao.href} href={secao.href} onClick={fechar}>
                {secao.rotulo}
              </LinkSecao>
            ))}
            <LinkAcessoMenu href={urlAcesso} onClick={fechar}>
              Acessar o sistema
            </LinkAcessoMenu>
          </Navegacao>

          <Acoes>
            <AcessoDesktop>
              <Button href={urlAcesso} variante="ghost" tamanho="sm">
                Acessar o sistema
              </Button>
            </AcessoDesktop>
            <Button href={urlAdesaoTeste} tamanho="sm">
              Começar grátis
            </Button>
            <BotaoMenu
              type="button"
              aria-expanded={aberto}
              aria-controls="menu-principal"
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              onClick={() => setAberto((atual) => !atual)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d={aberto ? "M4 4L16 16M16 4L4 16" : "M3 6H17M3 10H17M3 14H17"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </BotaoMenu>
          </Acoes>
        </Linha>
      </Barra>
    </>
  );
}
