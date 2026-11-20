import { vi } from "vitest";

type Preferencias = {
  // "hover: hover" e "pointer: fine": aparelho com mouse.
  cursorFino?: boolean;
  // "prefers-reduced-motion: reduce".
  menosMovimento?: boolean;
};

// Troca o matchMedia (que o jsdom não tem) por um que responde às preferências do teste.
export function simularMatchMedia({ cursorFino = false, menosMovimento = false }: Preferencias = {}) {
  const casa = (consulta: string) => {
    if (consulta.includes("prefers-reduced-motion: reduce")) return menosMovimento;
    const exigeMovimento = consulta.includes("prefers-reduced-motion: no-preference");
    if (exigeMovimento && menosMovimento) return false;
    const exigeCursor = consulta.includes("hover: hover") || consulta.includes("pointer: fine");
    if (exigeCursor && !cursorFino) return false;
    return exigeMovimento || exigeCursor;
  };

  vi.stubGlobal(
    "matchMedia",
    vi.fn((consulta: string) => ({
      matches: casa(consulta),
      media: consulta,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    })),
  );
}
