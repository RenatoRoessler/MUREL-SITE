import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { TituloEmLinhas } from "./TituloEmLinhas";

describe("TituloEmLinhas", () => {
  it("sem medida de layout, mostra o título como texto corrido, com o mesmo nível e id", () => {
    renderComTema(<TituloEmLinhas id="faq-titulo" texto="Perguntas frequentes" />);

    const titulo = screen.getByRole("heading", { level: 2, name: "Perguntas frequentes" });
    expect(titulo).toHaveAttribute("id", "faq-titulo");
    expect(titulo.querySelector("[aria-hidden]")).toBeNull();
  });
});
