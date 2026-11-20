import { act, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet, ThemeProvider } from "styled-components";
import { afterEach, describe, expect, it, vi } from "vitest";
import { urlAdesaoTeste } from "@/lib/config";
import { simularIntersectionObserver } from "@/test/intersectionObserver";
import { theme } from "@/styles/theme";
import { renderComTema } from "@/test/render";
import { BarraComecar } from "./BarraComecar";
import { AlturaDaBarra } from "./BarraComecar.styles";

function criarSecao(id: string) {
  const secao = document.createElement("section");
  secao.id = id;
  document.body.append(secao);
  return secao;
}

const barra = () => screen.getByLabelText("Atalho para o mês grátis", { selector: "aside" });
const estaVisivel = () => getComputedStyle(barra()).visibility === "visible";

afterEach(() => {
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

describe("BarraComecar", () => {
  it("leva ao teste grátis, com o texto do back-end", () => {
    simularIntersectionObserver();
    renderComTema(<BarraComecar teste={{ duracaoMeses: 1 }} />);
    expect(screen.getByRole("link", { name: "Comece com 1 mês grátis", hidden: true })).toHaveAttribute("href", urlAdesaoTeste);
  });

  it("não cita duração quando o back-end não informa", () => {
    simularIntersectionObserver();
    renderComTema(<BarraComecar teste={null} />);
    expect(screen.getByRole("link", { name: "Comece grátis", hidden: true })).toBeInTheDocument();
  });

  it("some enquanto o Hero está na tela e aparece depois dele", () => {
    const observadores = simularIntersectionObserver();
    const topo = criarSecao("topo");
    renderComTema(<BarraComecar teste={null} />);

    act(() => observadores[0].emitir(topo, true));
    expect(estaVisivel()).toBe(false);

    act(() => observadores[0].emitir(topo, false));
    expect(estaVisivel()).toBe(true);
  });

  it("some no Contato e no rodapé", () => {
    const observadores = simularIntersectionObserver();
    const contato = criarSecao("contato");
    const rodape = criarSecao("rodape");
    renderComTema(<BarraComecar teste={null} />);
    expect(estaVisivel()).toBe(true);

    act(() => observadores[1].emitir(contato, true));
    expect(estaVisivel()).toBe(false);

    act(() => observadores[1].emitir(contato, false));
    act(() => observadores[1].emitir(rodape, true));
    expect(estaVisivel()).toBe(false);
  });

  it("some enquanto um campo de formulário tem foco, e volta ao sair dele", () => {
    simularIntersectionObserver();
    const campo = document.createElement("input");
    document.body.append(campo);
    renderComTema(<BarraComecar teste={null} />);
    expect(estaVisivel()).toBe(true);

    act(() => campo.focus());
    expect(estaVisivel()).toBe(false);

    act(() => campo.blur());
    expect(estaVisivel()).toBe(true);
  });

  it("publica a altura da barra, só abaixo de md, para o WhatsApp subir acima dela", () => {
    const folha = new ServerStyleSheet();
    renderToString(
      folha.collectStyles(
        <ThemeProvider theme={theme}>
          <AlturaDaBarra $ativa />
        </ThemeProvider>,
      ),
    );
    const css = folha.getStyleTags();
    folha.seal();
    expect(css).toMatch(/--barra-fixa:\s*72px/);
    expect(css).toMatch(/@media not all and \(min-width:\s*768px\)/);

    const inativa = new ServerStyleSheet();
    renderToString(
      inativa.collectStyles(
        <ThemeProvider theme={theme}>
          <AlturaDaBarra $ativa={false} />
        </ThemeProvider>,
      ),
    );
    expect(inativa.getStyleTags()).not.toMatch(/--barra-fixa/);
    inativa.seal();
  });
});
