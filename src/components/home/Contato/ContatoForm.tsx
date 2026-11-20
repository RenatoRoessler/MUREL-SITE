"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { BotaoMagnetico } from "@/components/ui/Button/BotaoMagnetico";
import { Button } from "@/components/ui/Button/Button";
import type { CamposContato, EstadoContato, ErrosContato } from "@/types/contato";
import {
  Armadilha,
  AreaTexto,
  Aviso,
  AvisoDoPar,
  Campo,
  Carregando,
  Confirmacao,
  Entrada,
  Formulario,
  Grade,
  MensagemErro,
  Opcional,
  Resumo,
  Rodape,
  Rotulo,
  Selecao,
  SeloOk,
} from "./Contato.styles";

type AcaoContato = (estado: EstadoContato, formData: FormData) => Promise<EstadoContato>;

type EstadoComTentativa = EstadoContato & { tentativa: number };

const valoresVazios: CamposContato = {
  nome: "",
  patio: "",
  tipo: "",
  email: "",
  telefone: "",
  mensagem: "",
};

const ordemCampos: (keyof CamposContato)[] = ["nome", "patio", "tipo", "email", "telefone", "mensagem"];

const rotulos: Record<keyof CamposContato, string> = {
  nome: "Nome",
  patio: "Nome do pátio",
  tipo: "Tipo de negócio",
  email: "E-mail",
  telefone: "Telefone",
  mensagem: "Mensagem",
};

function BotaoEnviar() {
  const { pending } = useFormStatus();
  return (
    <BotaoMagnetico>
      <Button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? (
          <>
            <Carregando aria-hidden="true" />
            Enviando...
          </>
        ) : (
          "Enviar mensagem"
        )}
      </Button>
    </BotaoMagnetico>
  );
}

export function ContatoForm({ acao }: { acao: AcaoContato }) {
  // `tentativa` conta os envios: com ela o campo com erro é recriado e o tremor roda de novo a cada tentativa.
  const [estado, formAction] = useActionState(
    async (anterior: EstadoComTentativa, dados: FormData): Promise<EstadoComTentativa> => ({
      ...(await acao(anterior, dados)),
      tentativa: anterior.tentativa + 1,
    }),
    { status: "inicial", tentativa: 0 } as EstadoComTentativa,
  );
  const resumoRef = useRef<HTMLDivElement>(null);

  const valores = "valores" in estado ? estado.valores : valoresVazios;
  const erros: ErrosContato = estado.status === "erro-validacao" ? estado.erros : {};
  const camposComErro = ordemCampos.filter((campo) => erros[campo]);
  const temResumo = camposComErro.length > 0 || estado.status === "falha-envio";

  useEffect(() => {
    if (temResumo) resumoRef.current?.focus();
  }, [estado, temResumo]);

  if (estado.status === "enviado") {
    return (
      <Confirmacao role="status">
        <SeloOk viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="21" pathLength={1} />
          <path d="M14 25l7 7 13-15" pathLength={1} />
        </SeloOk>
        <h3>Mensagem enviada.</h3>
        <p>Recebemos o seu contato e a equipe da Murel responde por e-mail ou telefone, conforme você informou.</p>
      </Confirmacao>
    );
  }

  // `ligadoAoAviso`: e-mail e telefone são "um dos dois"; o aviso fica ligado aos dois campos.
  const propsCampo = (campo: keyof CamposContato, ligadoAoAviso = false) => ({
    id: `contato-${campo}`,
    name: campo,
    defaultValue: valores[campo],
    "aria-invalid": erros[campo] ? true : undefined,
    "aria-describedby": [erros[campo] ? `contato-${campo}-erro` : null, ligadoAoAviso ? "contato-aviso" : null].filter(Boolean).join(" ") || undefined,
    $invalido: Boolean(erros[campo]),
  });

  // Recria o campo a cada tentativa com erro, para o tremor rodar de novo.
  const chave = (campo: keyof CamposContato) => `${campo}-${erros[campo] ? estado.tentativa : 0}`;

  const erroDe = (campo: keyof CamposContato) =>
    erros[campo] ? <MensagemErro id={`contato-${campo}-erro`}>{erros[campo]}</MensagemErro> : null;

  return (
    <Formulario action={formAction} noValidate>
      {temResumo ? (
        <Resumo ref={resumoRef} role="alert" tabIndex={-1}>
          {estado.status === "falha-envio" ? (
            <>
              <h3>Não conseguimos enviar a mensagem.</h3>
              <p>
                O que você escreveu continua aqui. Tente de novo em alguns minutos ou escreva para
                contato@murel.com.br.
              </p>
            </>
          ) : (
            <>
              <h3>Confira os campos abaixo:</h3>
              <ul>
                {camposComErro.map((campo) => (
                  <li key={campo}>
                    <a href={`#contato-${campo}`}>
                      {rotulos[campo]}: {erros[campo]}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Resumo>
      ) : null}

      <Grade>
        <Campo $flutuante>
          <Rotulo htmlFor="contato-nome">
            Nome <Opcional>(obrigatório)</Opcional>
          </Rotulo>
          <Entrada key={chave("nome")} placeholder=" " {...propsCampo("nome")} type="text" autoComplete="name" required />
          {erroDe("nome")}
        </Campo>
        <Campo $flutuante>
          <Rotulo htmlFor="contato-patio">
            Nome do pátio <Opcional>(opcional)</Opcional>
          </Rotulo>
          <Entrada key={chave("patio")} placeholder=" " {...propsCampo("patio")} type="text" autoComplete="organization" />
          {erroDe("patio")}
        </Campo>
        <Campo>
          <Rotulo htmlFor="contato-tipo">
            Tipo de negócio <Opcional>(opcional)</Opcional>
          </Rotulo>
          <Selecao key={chave("tipo")} {...propsCampo("tipo")}>
            <option value="">Escolha uma opção</option>
            <option value="estacionamento">Estacionamento</option>
            <option value="valet">Valet</option>
            <option value="lava-rapido">Lava-rápido</option>
            <option value="mais-de-um">Mais de um</option>
          </Selecao>
          {erroDe("tipo")}
        </Campo>
      </Grade>

      <Grade>
        <Campo $flutuante>
          <Rotulo htmlFor="contato-email">
            E-mail <Opcional>(ou telefone)</Opcional>
          </Rotulo>
          <Entrada key={chave("email")} placeholder=" " {...propsCampo("email", true)} type="email" autoComplete="email" />
          {erroDe("email")}
        </Campo>
        <Campo $flutuante>
          <Rotulo htmlFor="contato-telefone">
            Telefone com DDD <Opcional>(ou e-mail)</Opcional>
          </Rotulo>
          <Entrada key={chave("telefone")} placeholder=" " {...propsCampo("telefone", true)} type="tel" autoComplete="tel" />
          {erroDe("telefone")}
        </Campo>
        <AvisoDoPar id="contato-aviso">Informe pelo menos um: e-mail ou telefone, para a gente poder responder.</AvisoDoPar>
      </Grade>

      <Campo>
        <Rotulo htmlFor="contato-mensagem">
          Mensagem <Opcional>(obrigatório)</Opcional>
        </Rotulo>
        <AreaTexto key={chave("mensagem")} {...propsCampo("mensagem")} rows={5} required />
        {erroDe("mensagem")}
      </Campo>

      <Armadilha aria-hidden="true">
        <label htmlFor="contato-site">Não preencha este campo</label>
        <input id="contato-site" name="site" type="text" tabIndex={-1} autoComplete="off" />
      </Armadilha>

      <Rodape>
        <BotaoEnviar />
        <Aviso>Usamos os seus dados só para responder a esta mensagem.</Aviso>
      </Rodape>
    </Formulario>
  );
}
