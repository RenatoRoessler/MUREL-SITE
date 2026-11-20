import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { RoloDeDigitos } from "./RoloDeDigitos";

const estilos = () =>
  Array.from(document.querySelectorAll("style"))
    .map((estilo) => estilo.textContent)
    .join("");

describe("RoloDeDigitos", () => {
  it("é decorativo: fica escondido do leitor de tela", () => {
    const { container } = renderComTema(<RoloDeDigitos valor={2} />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("traz os dígitos de 0 a 9, na ordem", () => {
    const { container } = renderComTema(<RoloDeDigitos valor={2} />);
    expect(container.textContent).toBe("0123456789");
  });

  it("já para no dígito certo (sem movimento, sem JavaScript e na impressão)", () => {
    renderComTema(<RoloDeDigitos valor={2} />);
    expect(estilos()).toContain("translateY(-2em)");
  });

  it("com movimento, rola de 9 até o valor quando o bloco em volta aparece", () => {
    renderComTema(<RoloDeDigitos valor={2} />);
    const css = estilos();
    expect(css).toContain("@media screen and (scripting: enabled)");
    expect(css).toContain("@media (prefers-reduced-motion: no-preference)");
    expect(css).toMatch(/\[data-estado="pendente"\][^{]*\{[^}]*translateY\(-9em\)/);
  });

  it("o zero não anda: fica no topo da coluna", () => {
    renderComTema(<RoloDeDigitos valor={0} />);
    expect(estilos()).toMatch(/translateY\(0em\)/);
  });
});
