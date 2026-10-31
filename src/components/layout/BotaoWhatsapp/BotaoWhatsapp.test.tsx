import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlWhatsapp } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { BotaoWhatsapp } from "./BotaoWhatsapp";

describe("BotaoWhatsapp", () => {
  it("abre a conversa do WhatsApp em nova aba, de forma segura", () => {
    renderComTema(<BotaoWhatsapp />);
    const link = screen.getByRole("link", { name: /WhatsApp/ });
    expect(link).toHaveAttribute("href", urlWhatsapp);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("tem nome acessível que começa pelo rótulo visível e avisa a nova aba", () => {
    renderComTema(<BotaoWhatsapp />);
    const link = screen.getByRole("link", { name: /^Estamos online!/ });
    expect(link).toHaveAccessibleName(/abre em nova aba/);
    expect(screen.getByText("Estamos online!")).toBeVisible();
  });

  it("fica fixo na tela e recebe foco por teclado", () => {
    renderComTema(<BotaoWhatsapp />);
    const link = screen.getByRole("link", { name: /WhatsApp/ });
    expect(getComputedStyle(link).position).toBe("fixed");
    link.focus();
    expect(link).toHaveFocus();
  });
});
