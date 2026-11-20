import { vi, type Mock } from "vitest";

type Callback = (entradas: Partial<IntersectionObserverEntry>[]) => void;

export interface ObservadorFalso {
  // O último elemento observado (compatibilidade) e todos os observados.
  alvo: Element | null;
  alvos: Element[];
  desconectar: Mock<() => void>;
  // Avisa que o último elemento observado entrou na tela.
  mostrar: () => void;
  // Avisa que um elemento específico entrou ou saiu da tela.
  emitir: (alvo: Element, visivel: boolean) => void;
}

// Troca o IntersectionObserver (que o jsdom não tem) por um que só dispara quando o teste manda.
export function simularIntersectionObserver() {
  const observadores: ObservadorFalso[] = [];

  class ObservadorDeTeste {
    private readonly registro: ObservadorFalso;

    constructor(callback: Callback) {
      this.registro = {
        alvo: null,
        alvos: [],
        desconectar: vi.fn(),
        mostrar: () => callback([{ isIntersecting: true }]),
        emitir: (alvo, visivel) => callback([{ target: alvo, isIntersecting: visivel }]),
      };
      observadores.push(this.registro);
    }

    observe(elemento: Element) {
      this.registro.alvo = elemento;
      this.registro.alvos.push(elemento);
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
