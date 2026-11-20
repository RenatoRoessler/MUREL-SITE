import { vi } from "vitest";

type Callback = (entradas: Partial<IntersectionObserverEntry>[]) => void;

export interface ObservadorFalso {
  alvo: Element | null;
  desconectar: ReturnType<typeof vi.fn>;
  mostrar: () => void;
}

// Troca o IntersectionObserver (que o jsdom não tem) por um que só dispara quando o teste manda.
export function simularIntersectionObserver() {
  const observadores: ObservadorFalso[] = [];

  class ObservadorDeTeste {
    constructor(private readonly callback: Callback) {
      this.registro = { alvo: null, desconectar: vi.fn(), mostrar: () => callback([{ isIntersecting: true }]) };
      observadores.push(this.registro);
    }
    private readonly registro: ObservadorFalso;
    observe(elemento: Element) {
      this.registro.alvo = elemento;
    }
    disconnect() {
      this.registro.desconectar();
    }
    unobserve() {}
    takeRecords() {
      return [];
    }
  }

  vi.stubGlobal("IntersectionObserver", ObservadorDeTeste);
  return observadores;
}
