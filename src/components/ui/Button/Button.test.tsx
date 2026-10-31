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

  it("usa o verde do WhatsApp na variante whatsapp", () => {
    renderComTema(
      <>
        <Button href="#a" variante="primary">
          Primário
        </Button>
        <Button href="https://wa.me/5500000000000" variante="whatsapp">
          WhatsApp
        </Button>
      </>,
    );
    const primario = getComputedStyle(screen.getByRole("link", { name: "Primário" }));
    const whatsapp = getComputedStyle(screen.getByRole("link", { name: "WhatsApp" }));
    expect(whatsapp.backgroundColor).not.toBe(primario.backgroundColor);
    expect(whatsapp.backgroundColor).toBe("rgb(37, 211, 102)");
  });

  it("recebe foco por teclado", async () => {
    renderComTema(<Button href="#a">Foco</Button>);
    const link = screen.getByRole("link", { name: "Foco" });
    link.focus();
    expect(link).toHaveFocus();
  });
});
