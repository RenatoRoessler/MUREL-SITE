import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { simularIntersectionObserver } from "@/test/intersectionObserver";
import { useSecaoAtiva } from "./useSecaoAtiva";
import { useSecaoEmVista } from "./useSecaoEmVista";

function criarSecoes(...ids: string[]) {
  return ids.map((id) => {
    const secao = document.createElement("section");
    secao.id = id;
    document.body.append(secao);
    return secao;
  });
}

function EmVista({ ids }: { ids: string[] }) {
  return <p>{useSecaoEmVista(ids) ? "em vista" : "fora"}</p>;
}

function Ativa({ ids }: { ids: string[] }) {
  return <p>{useSecaoAtiva(ids) ?? "nenhuma"}</p>;
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

describe("useSecaoEmVista", () => {
  it("começa fora e acompanha a entrada e a saída de qualquer das seções", () => {
    const observadores = simularIntersectionObserver();
    const [contato, rodape] = criarSecoes("contato", "rodape");
    render(<EmVista ids={["contato", "rodape"]} />);
    expect(screen.getByText("fora")).toBeInTheDocument();

    act(() => observadores[0].emitir(contato, true));
    expect(screen.getByText("em vista")).toBeInTheDocument();

    act(() => observadores[0].emitir(rodape, true));
    act(() => observadores[0].emitir(contato, false));
    expect(screen.getByText("em vista")).toBeInTheDocument();

    act(() => observadores[0].emitir(rodape, false));
    expect(screen.getByText("fora")).toBeInTheDocument();
  });

  it("ignora ids que não existem e desconecta ao desmontar", () => {
    const observadores = simularIntersectionObserver();
    criarSecoes("contato");
    const { unmount } = render(<EmVista ids={["contato", "nao-existe"]} />);
    expect(observadores[0].alvos).toHaveLength(1);
    unmount();
    expect(observadores[0].desconectar).toHaveBeenCalled();
  });

  it("devolve fora quando não há IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    criarSecoes("contato");
    render(<EmVista ids={["contato"]} />);
    expect(screen.getByText("fora")).toBeInTheDocument();
  });
});

describe("useSecaoAtiva", () => {
  it("devolve a seção na faixa central e mantém a última entre duas seções", () => {
    const observadores = simularIntersectionObserver();
    const [sistema, planos] = criarSecoes("sistema", "planos");
    render(<Ativa ids={["sistema", "planos"]} />);
    expect(screen.getByText("nenhuma")).toBeInTheDocument();

    act(() => observadores[0].emitir(sistema, true));
    expect(screen.getByText("sistema")).toBeInTheDocument();

    act(() => observadores[0].emitir(sistema, false));
    expect(screen.getByText("sistema")).toBeInTheDocument();

    act(() => observadores[0].emitir(planos, true));
    expect(screen.getByText("planos")).toBeInTheDocument();
  });

  it("com duas seções na faixa, vale a primeira da lista", () => {
    const observadores = simularIntersectionObserver();
    const [sistema, planos] = criarSecoes("sistema", "planos");
    render(<Ativa ids={["sistema", "planos"]} />);
    act(() => observadores[0].emitir(planos, true));
    act(() => observadores[0].emitir(sistema, true));
    expect(screen.getByText("sistema")).toBeInTheDocument();
  });
});
