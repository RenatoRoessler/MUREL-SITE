import { vi, type Mock } from "vitest";

export interface ResizeObserverFalso {
  alvos: Element[];
  desconectar: Mock<() => void>;
  // Avisa que o tamanho de todos os elementos observados mudou.
  redimensionar: () => void;
}

// Troca o ResizeObserver (que o jsdom não tem) por um que só dispara quando o teste manda.
export function simularResizeObserver() {
  const observadores: ResizeObserverFalso[] = [];

  class ObservadorDeTeste {
    private readonly registro: ResizeObserverFalso;

    constructor(callback: () => void) {
      this.registro = {
        alvos: [],
        desconectar: vi.fn(),
        redimensionar: () => callback(),
      };
      observadores.push(this.registro);
    }

    observe(elemento: Element) {
      this.registro.alvos.push(elemento);
    }

    unobserve() {}

    disconnect() {
      this.registro.desconectar();
    }
  }

  vi.stubGlobal("ResizeObserver", ObservadorDeTeste);
  return observadores;
}
