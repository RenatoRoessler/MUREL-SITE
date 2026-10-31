"use client";

import { useState } from "react";
import { LogoMurel } from "@/components/brand/LogoMurel";
import { Button } from "@/components/ui/Button/Button";
import { urlAcesso } from "@/lib/config";
import {
  Acoes,
  Barra,
  BotaoMenu,
  Linha,
  LinkSecao,
  Marca,
  Navegacao,
  PularConteudo,
} from "./Header.styles";

const secoes = [
  { href: "#sistema", rotulo: "Sistema" },
  { href: "#como-funciona", rotulo: "Como funciona" },
  { href: "#perguntas", rotulo: "Perguntas" },
  { href: "#contato", rotulo: "Contato" },
];

export function Header() {
  const [aberto, setAberto] = useState(false);
  const fechar = () => setAberto(false);

  return (
    <>
      <PularConteudo href="#conteudo">Ir para o conteúdo</PularConteudo>
      <Barra>
        <Linha>
          <Marca href="#topo" aria-label="Murel, início da página">
            <LogoMurel />
          </Marca>

          <Navegacao id="menu-principal" aria-label="Seções da página" $aberto={aberto}>
            {secoes.map((secao) => (
              <LinkSecao key={secao.href} href={secao.href} onClick={fechar}>
                {secao.rotulo}
              </LinkSecao>
            ))}
          </Navegacao>

          <Acoes>
            <Button href={urlAcesso} variante="ghost" tamanho="sm">
              Acessar o sistema
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
