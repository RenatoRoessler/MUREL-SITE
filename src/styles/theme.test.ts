import { describe, expect, it } from "vitest";
import { theme } from "./theme";

function luminancia(hex: string) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contraste(a: string, b: string) {
  const [claro, escuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (escuro + 0.05);
}

describe("tema", () => {
  it("expõe os tokens do guia de marca", () => {
    expect(theme.colors.asfalto).toBe("#0E1729");
    expect(theme.colors.amarelo).toBe("#FFC20E");
    expect(theme.fontFamilies.sans).toContain("--font-plus-jakarta");
    expect(theme.fontFamilies.mono).toContain("--font-jetbrains");
  });

  it("botão amarelo com texto asfalto atinge contraste AA", () => {
    expect(contraste(theme.colors.asfalto, theme.colors.amarelo)).toBeGreaterThanOrEqual(4.5);
  });

  it("expõe os tokens do WhatsApp", () => {
    expect(theme.colors.whatsapp).toBe("#25D366");
    expect(theme.colors.whatsappEscuro).toBe("#1EBE5B");
  });

  it("texto asfalto sobre o verde do WhatsApp atinge contraste AA, também no hover", () => {
    expect(contraste(theme.colors.asfalto, theme.colors.whatsapp)).toBeGreaterThanOrEqual(4.5);
    expect(contraste(theme.colors.asfalto, theme.colors.whatsappEscuro)).toBeGreaterThanOrEqual(4.5);
  });

  it("texto névoa sobre asfalto atinge contraste AA", () => {
    expect(contraste(theme.colors.nevoa, theme.colors.asfalto)).toBeGreaterThanOrEqual(4.5);
  });

  it("texto giz sobre asfalto2 atinge contraste AA", () => {
    expect(contraste(theme.colors.giz, theme.colors.asfalto2)).toBeGreaterThanOrEqual(4.5);
  });
});
