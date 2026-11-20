import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { urlAdesaoTeste } from "@/lib/config";
import { ofertaEmPromocao } from "@/test/oferta";
import { renderComTema } from "@/test/render";
import { Contato } from "./Contato";

const abas = () => screen.getAllByRole("tab", { hidden: true });

describe("Contato", () => {
  it("tem três abas, com a mensagem aberta por padrão", () => {
    renderComTema(<Contato teste={ofertaEmPromocao.teste} />);
    expect(abas().map((aba) => aba.textContent)).toEqual(["Escrever mensagem", "Falar agora", "Ver funcionando"]);
    expect(abas()[0]).toHaveAttribute("aria-selected", "true");
    expect(abas()[1]).toHaveAttribute("aria-selected", "false");
  });

  it("deixa os três painéis no HTML, e só o da aba ativa marcado como ativo", () => {
    const { container } = renderComTema(<Contato teste={ofertaEmPromocao.teste} />);
    const paineis = Array.from(container.querySelectorAll('[role="tabpanel"]'));
    expect(paineis.map((painel) => painel.getAttribute("data-ativo"))).toEqual(["true", "false", "false"]);
    expect(screen.getByLabelText(/^Nome\s*\(obrigat/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Chamar no WhatsApp" })).toHaveAttribute("href", expect.stringContaining("wa.me"));
    expect(screen.getByRole("link", { name: "Começar grátis" })).toHaveAttribute("href", urlAdesaoTeste);
  });

  it("troca de aba por clique e por setas, sem perder o que foi digitado no formulário", async () => {
    const usuario = userEvent.setup();
    renderComTema(<Contato teste={ofertaEmPromocao.teste} />);
    await usuario.type(screen.getByLabelText(/^Nome\s*\(obrigat/), "Maria Souza");

    fireEvent.click(abas()[1]);
    expect(abas()[1]).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(abas()[1], { key: "ArrowRight" });
    expect(abas()[2]).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(abas()[2], { key: "Home" });
    expect(abas()[0]).toHaveAttribute("aria-selected", "true");

    expect(screen.getByLabelText(/^Nome\s*\(obrigat/)).toHaveValue("Maria Souza");
  });

  it("usa a duração do teste vinda do back-end e, sem ela, não cita número", () => {
    const { unmount } = renderComTema(<Contato teste={{ duracaoMeses: 1 }} />);
    expect(screen.getByText("Use o sistema completo por 1 mês, sem cartão e sem compromisso.")).toBeInTheDocument();
    unmount();

    renderComTema(<Contato teste={null} />);
    expect(screen.getByRole("link", { name: "Começar grátis" })).toHaveAttribute("href", urlAdesaoTeste);
    expect(screen.queryByText(/\d+ m[êe]s/)).not.toBeInTheDocument();
  });
});
