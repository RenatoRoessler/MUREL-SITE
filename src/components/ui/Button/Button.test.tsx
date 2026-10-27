import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { Button } from "./Button";

describe("Button", () => {
  it("vira link quando recebe href", () => {
    renderComTema(<Button href="https://app.exemplo.com/login">Acessar o sistema</Button>);
    const link = screen.getByRole("link", { name: "Acessar o sistema" });
    expect(link).toHaveAttribute("href", "https://app.exemplo.com/login");
  });

  it("vira botão sem href e respeita disabled", () => {
    renderComTema(
      <Button type="submit" disabled>
        Enviar mensagem
      </Button>,
    );
    const botao = screen.getByRole("button", { name: "Enviar mensagem" });
    expect(botao).toBeDisabled();
    expect(botao).toHaveAttribute("type", "submit");
  });

  it("aplica estilos diferentes por variante", () => {
    renderComTema(
      <>
        <Button href="#a" variante="primary">
          Primário
        </Button>
        <Button href="#b" variante="ghost">
          Contorno
        </Button>
      </>,
    );
    const primario = getComputedStyle(screen.getByRole("link", { name: "Primário" }));
    const contorno = getComputedStyle(screen.getByRole("link", { name: "Contorno" }));
    expect(primario.backgroundColor).not.toBe(contorno.backgroundColor);
  });

  it("recebe foco por teclado", async () => {
    renderComTema(<Button href="#a">Foco</Button>);
    const link = screen.getByRole("link", { name: "Foco" });
    link.focus();
    expect(link).toHaveFocus();
  });
});
