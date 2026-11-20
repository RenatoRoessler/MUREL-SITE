import { fireEvent, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderComTema } from "@/test/render";
import { TelasDoPerfil } from "./TelasDoPerfil";

const telas = [
  { id: "a", titulo: "Pátio", conteudo: <p>Tela do pátio</p> },
  { id: "b", titulo: "Entrada", conteudo: <p>Tela da entrada</p> },
  { id: "c", titulo: "Saída", conteudo: <p>Tela da saída</p> },
];

describe("TelasDoPerfil", () => {
  // Abaixo de lg a lista fica escondida e o jsdom aplica o CSS: as consultas usam hidden, e o foco do teclado é
  // coberto no teste do hook.
  const scrollTo = vi.fn();

  beforeEach(() => {
    Element.prototype.scrollTo = scrollTo;
  });

  afterEach(() => {
    scrollTo.mockClear();
  });

  it("deixa todas as telas no HTML e lista o título de cada uma", () => {
    const { container } = renderComTema(<TelasDoPerfil rotulo="Operador" telas={telas} />);
    expect(screen.getByRole("region", { name: "Telas do perfil Operador" })).toBeInTheDocument();
    expect(screen.getAllByRole("group", { name: /^Tela \d de 3$/ })).toHaveLength(3);

    const lista = container.querySelector("nav")!;
    expect(lista).toHaveAttribute("aria-label", "Lista de telas do perfil Operador");
    expect(within(lista).getAllByRole("button", { hidden: true }).map((botao) => botao.textContent)).toEqual(["01Pátio", "02Entrada", "03Saída"]);
  });

  it("começa na primeira tela e marca a ativa na lista", () => {
    const { container } = renderComTema(<TelasDoPerfil rotulo="Operador" telas={telas} />);
    const botoes = within(container.querySelector("nav")!).getAllByRole("button", { hidden: true });
    expect(botoes.map((botao) => botao.getAttribute("aria-current"))).toEqual(["true", "false", "false"]);
    expect(screen.getByRole("group", { name: "Tela 1 de 3" })).toHaveAttribute("data-ativo", "true");
    expect(screen.getByRole("group", { name: "Tela 2 de 3" })).toHaveAttribute("data-ativo", "false");
  });

  it("troca a tela ativa pelo clique na lista", () => {
    const { container } = renderComTema(<TelasDoPerfil rotulo="Operador" telas={telas} />);
    fireEvent.click(within(container.querySelector("nav")!).getByRole("button", { name: /Saída/, hidden: true }));

    expect(screen.getByRole("group", { name: "Tela 3 de 3" })).toHaveAttribute("data-ativo", "true");
    expect(screen.getByRole("group", { name: "Tela 1 de 3" })).toHaveAttribute("data-ativo", "false");
    expect(screen.getByRole("status")).toHaveTextContent("Tela 3 de 3");
  });

  it("troca a tela pelas setas do teclado, com volta nas pontas", () => {
    const { container } = renderComTema(<TelasDoPerfil rotulo="Operador" telas={telas} />);
    const botoes = () => within(container.querySelector("nav")!).getAllByRole("button", { hidden: true });

    fireEvent.keyDown(botoes()[0], { key: "ArrowDown" });
    expect(botoes()[1]).toHaveAttribute("aria-current", "true");

    fireEvent.keyDown(botoes()[1], { key: "ArrowUp" });
    fireEvent.keyDown(botoes()[0], { key: "ArrowUp" });
    expect(botoes()[2]).toHaveAttribute("aria-current", "true");
  });

  it("o carrossel continua trocando a tela pelos botões, para o celular", () => {
    const { container } = renderComTema(<TelasDoPerfil rotulo="Operador" telas={telas} />);
    fireEvent.click(screen.getByRole("button", { name: "Próxima tela" }));
    expect(screen.getByRole("status")).toHaveTextContent("Tela 2 de 3");
    expect(within(container.querySelector("nav")!).getAllByRole("button", { hidden: true })[1]).toHaveAttribute("aria-current", "true");
  });

  it("mostra a legenda com o título e a posição da tela atual, e a atualiza", () => {
    const { container } = renderComTema(<TelasDoPerfil rotulo="Operador" telas={telas} />);
    const legenda = () => container.querySelector("p[aria-hidden='true']")!;
    expect(legenda()).toHaveTextContent("Pátio · 1 de 3");

    fireEvent.click(screen.getByRole("button", { name: "Próxima tela" }));
    expect(legenda()).toHaveTextContent("Entrada · 2 de 3");
  });

  it("no painel do desktop, a tela ativa entra com fade, só com movimento permitido", () => {
    renderComTema(<TelasDoPerfil rotulo="Operador" telas={telas} />);
    const css = Array.from(document.querySelectorAll("style"))
      .map((estilo) => estilo.textContent)
      .join("");
    expect(css).toContain("@media (prefers-reduced-motion: no-preference)");
    expect(css).toMatch(/\[data-ativo="true"\][^{]*\{[^}]*animation:[^;]*220ms/);
  });
});
