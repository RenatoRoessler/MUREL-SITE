import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderComTema } from "@/test/render";
import type { CamposContato, EstadoContato } from "@/types/contato";
import { ContatoForm } from "./ContatoForm";

const valores: CamposContato = {
  nome: "Maria Souza",
  patio: "Central",
  tipo: "valet",
  email: "",
  telefone: "",
  mensagem: "Quero conhecer o sistema.",
};

describe("ContatoForm", () => {
  it("mantém os valores e mostra o erro por campo após validação", async () => {
    const acao = vi.fn(
      async (): Promise<EstadoContato> => ({
        status: "erro-validacao",
        erros: { email: "Informe um e-mail ou um telefone para a gente responder." },
        valores,
      }),
    );
    const usuario = userEvent.setup();
    renderComTema(<ContatoForm acao={acao} />);

    await usuario.type(screen.getByLabelText(/^Nome\s*\(obrigat/), "Maria Souza");
    await usuario.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    const campoEmail = await screen.findByLabelText(/^E-mail/);
    expect(campoEmail).toHaveAttribute("aria-invalid", "true");
    expect(campoEmail).toHaveAccessibleDescription(/e-mail ou um telefone/i);
    expect(screen.getByLabelText(/^Nome\s*\(obrigat/)).toHaveValue("Maria Souza");
    expect(screen.getByLabelText(/Mensagem/)).toHaveValue("Quero conhecer o sistema.");
    expect(screen.getByRole("alert")).toHaveTextContent(/Confira os campos/i);
  });

  it("desabilita o botão enquanto envia", async () => {
    let concluir: (estado: EstadoContato) => void = () => {};
    const acao = vi.fn(() => new Promise<EstadoContato>((resolve) => (concluir = resolve)));
    const usuario = userEvent.setup();
    renderComTema(<ContatoForm acao={acao} />);

    await usuario.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    const botao = await screen.findByRole("button", { name: "Enviando..." });
    expect(botao).toBeDisabled();
    concluir({ status: "enviado" });
    await screen.findByRole("status");
  });

  it("mostra a confirmação quando a mensagem é enviada", async () => {
    const acao = vi.fn(async (): Promise<EstadoContato> => ({ status: "enviado" }));
    const usuario = userEvent.setup();
    renderComTema(<ContatoForm acao={acao} />);

    await usuario.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Mensagem enviada.");
    expect(screen.queryByRole("button", { name: "Enviar mensagem" })).not.toBeInTheDocument();
  });

  it("explica a falha de envio e mantém o que foi digitado", async () => {
    const acao = vi.fn(async (): Promise<EstadoContato> => ({ status: "falha-envio", valores }));
    const usuario = userEvent.setup();
    renderComTema(<ContatoForm acao={acao} />);

    await usuario.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    const alerta = await screen.findByRole("alert");
    expect(alerta).toHaveTextContent(/Não conseguimos enviar/i);
    expect(alerta).toHaveTextContent("contato@murel.com.br");
    await waitFor(() => expect(screen.getByLabelText(/^Nome\s*\(obrigat/)).toHaveValue("Maria Souza"));
  });

  it("tem o campo oculto de proteção fora do alcance de leitores de tela", () => {
    renderComTema(<ContatoForm acao={vi.fn()} />);
    const armadilha = document.querySelector<HTMLInputElement>('input[name="site"]');
    expect(armadilha).not.toBeNull();
    expect(armadilha?.closest("[aria-hidden='true']")).not.toBeNull();
    expect(armadilha).toHaveAttribute("tabindex", "-1");
  });

  it("marca só Nome e Mensagem como obrigatórios e E-mail e Telefone como um dos dois", () => {
    renderComTema(<ContatoForm acao={vi.fn()} />);
    expect(screen.getByLabelText(/^Nome\s*\(obrigat/)).toBeRequired();
    expect(screen.getByLabelText(/^Mensagem\s*\(obrigat/)).toBeRequired();
    expect(screen.getByLabelText(/^E-mail\s*\(ou telefone\)/)).not.toBeRequired();
    expect(screen.getByLabelText(/^Telefone com DDD\s*\(ou e-mail\)/)).not.toBeRequired();
    expect(screen.getByLabelText(/^Nome do pátio\s*\(opcional\)/)).not.toBeRequired();
  });

  it("liga o aviso 'informe pelo menos um' ao e-mail e ao telefone, antes do envio", () => {
    renderComTema(<ContatoForm acao={vi.fn()} />);
    const aviso = screen.getByText(/Informe pelo menos um/);
    expect(aviso).toHaveAttribute("id", "contato-aviso");
    expect(screen.getByLabelText(/^E-mail/)).toHaveAccessibleDescription(aviso.textContent ?? "");
    expect(screen.getByLabelText(/^Telefone com DDD/)).toHaveAccessibleDescription(aviso.textContent ?? "");
  });
});
