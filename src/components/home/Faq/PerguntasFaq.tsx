"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { Revelar } from "@/components/ui/Revelar/Revelar";
import { type GrupoDoFaq, normalizarTexto } from "./Faq.data";
import { Item, Lista, Pergunta, Resposta } from "./Faq.styles";
import {
  Busca,
  CampoDeBusca,
  Contagem,
  Ferramentas,
  Grupos,
  RotuloDaBusca,
  SemResultado,
  TituloDoGrupo,
} from "./PerguntasFaq.styles";

type PerguntasFaqProps = {
  grupos: GrupoDoFaq[];
};

export function PerguntasFaq({ grupos }: PerguntasFaqProps) {
  const idBusca = useId();
  const [busca, setBusca] = useState("");
  const [abertas, setAbertas] = useState<ReadonlySet<string>>(() => new Set());

  const termo = normalizarTexto(busca.trim());
  const gruposVisiveis = grupos
    .map((grupo) => ({
      ...grupo,
      perguntas: grupo.perguntas.filter((item) => termo === "" || normalizarTexto(`${item.pergunta} ${item.resposta}`).includes(termo)),
    }))
    .filter((grupo) => grupo.perguntas.length > 0);
  const visiveis = gruposVisiveis.flatMap((grupo) => grupo.perguntas);
  const todasAbertas = visiveis.length > 0 && visiveis.every((item) => abertas.has(item.pergunta));

  const alternar = (pergunta: string, aberta: boolean) => {
    setAbertas((atuais) => {
      const proximas = new Set(atuais);
      if (aberta) proximas.add(pergunta);
      else proximas.delete(pergunta);
      return proximas;
    });
  };

  const alternarTodas = () => {
    setAbertas((atuais) => {
      const proximas = new Set(atuais);
      for (const item of visiveis) {
        if (todasAbertas) proximas.delete(item.pergunta);
        else proximas.add(item.pergunta);
      }
      return proximas;
    });
  };

  return (
    <>
      <Ferramentas>
        <CampoDeBusca>
          <RotuloDaBusca htmlFor={idBusca}>Buscar nas perguntas</RotuloDaBusca>
          <Busca
            id={idBusca}
            type="search"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            autoComplete="off"
            enterKeyHint="search"
          />
        </CampoDeBusca>
        <Button type="button" variante="ghost" tamanho="sm" onClick={alternarTodas} disabled={visiveis.length === 0}>
          {todasAbertas ? "Fechar todas" : "Abrir todas"}
        </Button>
        <Contagem role="status" aria-live="polite">
          {visiveis.length === 1 ? "1 pergunta" : `${visiveis.length} perguntas`}
        </Contagem>
      </Ferramentas>

      {gruposVisiveis.length === 0 ? (
        <SemResultado>
          Nenhuma pergunta encontrada para “{busca.trim()}”. Tente outra palavra ou <a href="#contato">fale com a equipe</a>.
        </SemResultado>
      ) : (
        <Revelar as={Grupos} modo="filhos">
          {gruposVisiveis.map((grupo) => (
            <section key={grupo.titulo} aria-labelledby={`${idBusca}-${grupo.titulo}`}>
              <TituloDoGrupo id={`${idBusca}-${grupo.titulo}`}>{grupo.titulo}</TituloDoGrupo>
              <Lista>
                {grupo.perguntas.map((item) => (
                  <Item
                    key={item.pergunta}
                    open={abertas.has(item.pergunta)}
                    onToggle={(evento) => alternar(item.pergunta, evento.currentTarget.open)}
                  >
                    <Pergunta>{item.pergunta}</Pergunta>
                    <Resposta>{item.resposta}</Resposta>
                  </Item>
                ))}
              </Lista>
            </section>
          ))}
        </Revelar>
      )}
    </>
  );
}
