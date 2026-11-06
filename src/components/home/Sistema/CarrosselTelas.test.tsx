import { fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderComTema } from "@/test/render";
import { CarrosselTelas } from "./CarrosselTelas";

const slides = [
  { id: "a", conteudo: <p>Primeira tela</p> },
  { id: "b", conteudo: <p>Segunda tela</p> },
  { id: "c", conteudo: <p>Terceira tela</p> },
];

describe("CarrosselTelas", () => {
  const scrollTo = vi.fn();

  beforeEach(() => {
    Element.prototype.scrollTo = scrollTo;
  });

  afterEach(() => {
    scrollTo.mockClear();
  });

  it("é uma região de carrossel com nome e um grupo por tela", () => {
    renderComTema(<CarrosselTelas rotulo="Telas do operador" slides={slides} />);
    expect(screen.getByRole("region", { name: "Telas do operador" })).toHaveAttribute("aria-roledescription", "carrossel");
    expect(screen.getByRole("group", { name: "Tela 1 de 3" })).toHaveTextContent("Primeira tela");
    expect(screen.getByRole("group", { name: "Tela 3 de 3" })).toHaveTextContent("Terceira tela");
  });

  it("deixa o trilho focável para rolar pelo teclado", () => {
    renderComTema(<CarrosselTelas rotulo="Telas do operador" slides={slides} />);
    expect(screen.getByLabelText("Telas do operador: rolagem horizontal")).toHaveAttribute("tabindex", "0");
  });

  it("começa na primeira tela, com 'Tela anterior' desabilitada", () => {
    renderComTema(<CarrosselTelas rotulo="Telas do operador" slides={slides} />);
    expect(screen.getByRole("button", { name: "Tela anterior" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Próxima tela" })).toBeEnabled();
    expect(screen.getByRole("status")).toHaveTextContent("Tela 1 de 3");
  });

  it("avança e volta pelos botões e rola o trilho", () => {
    renderComTema(<CarrosselTelas rotulo="Telas do operador" slides={slides} />);
    fireEvent.click(screen.getByRole("button", { name: "Próxima tela" }));
    expect(scrollTo).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toHaveTextContent("Tela 2 de 3");
    expect(screen.getByRole("button", { name: "Tela anterior" })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: "Próxima tela" }));
    expect(screen.getByRole("status")).toHaveTextContent("Tela 3 de 3");
    expect(screen.getByRole("button", { name: "Próxima tela" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Tela anterior" }));
    expect(screen.getByRole("status")).toHaveTextContent("Tela 2 de 3");
  });

  it("não mostra controles quando há uma tela só", () => {
    renderComTema(<CarrosselTelas rotulo="Telas do cliente" slides={slides.slice(0, 1)} />);
    expect(screen.queryByRole("button", { name: "Próxima tela" })).toBeNull();
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByRole("group", { name: "Tela 1 de 1" })).toBeInTheDocument();
  });
});
