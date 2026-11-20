import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ofertaEmPromocao } from "@/test/oferta";
import { renderComTema } from "@/test/render";
import { agruparPerguntas, montarPerguntas, normalizarTexto } from "./Faq.data";
import { PerguntasFaq } from "./PerguntasFaq";

const perguntas = montarPerguntas(ofertaEmPromocao);
const grupos = agruparPerguntas(perguntas);

const detalhes = (container: HTMLElement) => Array.from(container.querySelectorAll("details"));

describe("agruparPerguntas", () => {
  it("separa as perguntas em dois grupos, sem perder nem repetir nenhuma", () => {
    expect(grupos.map((grupo) => grupo.titulo)).toEqual(["Preço e teste", "Como funciona"]);
    const todas = grupos.flatMap((grupo) => grupo.perguntas.map((item) => item.pergunta));
    expect(todas).toHaveLength(perguntas.length);
    expect(new Set(todas).size).toBe(todas.length);
    expect([...todas].sort()).toEqual(perguntas.map((item) => item.pergunta).sort());
  });

  it("põe preço e teste em um grupo e o funcionamento no outro", () => {
    const preco = grupos[0].perguntas.map((item) => item.pergunta);
    expect(preco).toContain("Quanto custa?");
    expect(preco).toContain("Posso cancelar quando quiser?");
    expect(grupos[1].perguntas.map((item) => item.pergunta)).toContain("Preciso comprar impressora?");
  });
});

describe("normalizarTexto", () => {
  it("ignora acento e caixa", () => {
    expect(normalizarTexto("Cartão de CRÉDITO")).toBe("cartao de credito");
  });
});

describe("PerguntasFaq", () => {
  it("mostra as perguntas em dois grupos, com cabeçalho, e a contagem", () => {
    const { container } = renderComTema(<PerguntasFaq grupos={grupos} />);
    expect(screen.getAllByRole("heading", { level: 3 }).map((titulo) => titulo.textContent)).toEqual(["Preço e teste", "Como funciona"]);
    expect(detalhes(container)).toHaveLength(perguntas.length);
    expect(screen.getByRole("status")).toHaveTextContent(`${perguntas.length} perguntas`);
  });

  it("filtra pela busca, ignorando acento e caixa, e atualiza a contagem", async () => {
    const usuario = userEvent.setup();
    const { container } = renderComTema(<PerguntasFaq grupos={grupos} />);

    await usuario.type(screen.getByLabelText("Buscar nas perguntas"), "CARTAO");
    expect(detalhes(container).map((detalhe) => within(detalhe).getByText(/./, { selector: "summary" }).textContent)).toContain(
      "Preciso de cartão de crédito para começar?",
    );
    expect(detalhes(container).length).toBeLessThan(perguntas.length);
    expect(screen.getByRole("status")).toHaveTextContent(String(detalhes(container).length));
  });

  it("busca também no texto das respostas", async () => {
    const usuario = userEvent.setup();
    const { container } = renderComTema(<PerguntasFaq grupos={grupos} />);
    await usuario.type(screen.getByLabelText("Buscar nas perguntas"), "impressora");
    expect(detalhes(container).length).toBeGreaterThan(0);
    for (const detalhe of detalhes(container)) {
      expect(normalizarTexto(detalhe.textContent ?? "")).toContain("impressora");
    }
  });

  it("sem resultado, avisa e leva ao contato", async () => {
    const usuario = userEvent.setup();
    renderComTema(<PerguntasFaq grupos={grupos} />);
    await usuario.type(screen.getByLabelText("Buscar nas perguntas"), "zzzzzz");

    expect(screen.getByText(/Nenhuma pergunta encontrada/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "fale com a equipe" })).toHaveAttribute("href", "#contato");
    expect(screen.getByRole("status")).toHaveTextContent("0 perguntas");
    expect(screen.getByRole("button", { name: "Abrir todas" })).toBeDisabled();
  });

  it("abre e fecha todas as perguntas pelo botão, que troca de rótulo", async () => {
    const usuario = userEvent.setup();
    const { container } = renderComTema(<PerguntasFaq grupos={grupos} />);
    expect(detalhes(container).some((detalhe) => detalhe.open)).toBe(false);

    await usuario.click(screen.getByRole("button", { name: "Abrir todas" }));
    expect(detalhes(container).every((detalhe) => detalhe.open)).toBe(true);
    expect(screen.getByRole("button", { name: "Fechar todas" })).toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "Fechar todas" }));
    expect(detalhes(container).some((detalhe) => detalhe.open)).toBe(false);
    expect(screen.getByRole("button", { name: "Abrir todas" })).toBeInTheDocument();
  });

  it("com a busca ativa, abrir todas vale só para as perguntas que aparecem", async () => {
    const usuario = userEvent.setup();
    const { container } = renderComTema(<PerguntasFaq grupos={grupos} />);
    await usuario.type(screen.getByLabelText("Buscar nas perguntas"), "impressora");
    await usuario.click(screen.getByRole("button", { name: "Abrir todas" }));
    await usuario.clear(screen.getByLabelText("Buscar nas perguntas"));

    const abertas = detalhes(container).filter((detalhe) => detalhe.open).length;
    expect(abertas).toBeGreaterThan(0);
    expect(abertas).toBeLessThan(perguntas.length);
  });
});
