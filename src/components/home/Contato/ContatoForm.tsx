"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button/Button";
import type { CamposContato, EstadoContato, ErrosContato } from "@/types/contato";
import {
  Armadilha,
  AreaTexto,
  Aviso,
  Campo,
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
} from "./Contato.styles";

type AcaoContato = (estado: EstadoContato, formData: FormData) => Promise<EstadoContato>;

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
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? "Enviando..." : "Enviar mensagem"}
    </Button>
  );
}

export function ContatoForm({ acao }: { acao: AcaoContato }) {
  const [estado, formAction] = useActionState(acao, { status: "inicial" } as EstadoContato);
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
        <h3>Mensagem enviada.</h3>
        <p>Recebemos o seu contato e a equipe da Murel responde por e-mail ou telefone, conforme você informou.</p>
      </Confirmacao>
    );
  }

  const propsCampo = (campo: keyof CamposContato) => ({
    id: `contato-${campo}`,
    name: campo,
    defaultValue: valores[campo],
    "aria-invalid": erros[campo] ? true : undefined,
    "aria-describedby": erros[campo] ? `contato-${campo}-erro` : undefined,
    $invalido: Boolean(erros[campo]),
  });

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
        <Campo>
          <Rotulo htmlFor="contato-nome">Nome</Rotulo>
          <Entrada {...propsCampo("nome")} type="text" autoComplete="name" required />
          {erroDe("nome")}
        </Campo>
        <Campo>
          <Rotulo htmlFor="contato-patio">
            Nome do pátio <Opcional>(opcional)</Opcional>
          </Rotulo>
          <Entrada {...propsCampo("patio")} type="text" autoComplete="organization" />
          {erroDe("patio")}
        </Campo>
        <Campo>
          <Rotulo htmlFor="contato-tipo">
            Tipo de negócio <Opcional>(opcional)</Opcional>
          </Rotulo>
          <Selecao {...propsCampo("tipo")}>
            <option value="">Escolha uma opção</option>
            <option value="estacionamento">Estacionamento</option>
            <option value="valet">Valet</option>
            <option value="lava-rapido">Lava-rápido</option>
            <option value="mais-de-um">Mais de um</option>
          </Selecao>
          {erroDe("tipo")}
        </Campo>
        <Campo>
          <Rotulo htmlFor="contato-email">E-mail</Rotulo>
          <Entrada {...propsCampo("email")} type="email" autoComplete="email" />
          {erroDe("email")}
        </Campo>
        <Campo>
          <Rotulo htmlFor="contato-telefone">Telefone com DDD</Rotulo>
          <Entrada {...propsCampo("telefone")} type="tel" autoComplete="tel" />
          {erroDe("telefone")}
        </Campo>
      </Grade>

      <Aviso>Informe pelo menos um: e-mail ou telefone, para a gente poder responder.</Aviso>

      <Campo>
        <Rotulo htmlFor="contato-mensagem">Mensagem</Rotulo>
        <AreaTexto {...propsCampo("mensagem")} rows={5} required />
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
