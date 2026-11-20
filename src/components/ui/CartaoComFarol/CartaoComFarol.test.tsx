import { screen } from "@testing-library/react";
import { renderComTema } from "@/test/render";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { CartaoComFarol } from "./CartaoComFarol";

describe("CartaoComFarol", () => {
  it("renderiza o conteúdo na tag escolhida", () => {
    renderComTema(
      <ul>
        <CartaoComFarol as="li">Plano mensal</CartaoComFarol>
      </ul>,
    );

    expect(screen.getByRole("listitem")).toHaveTextContent("Plano mensal");
  });

  it("usa div por padrão e repassa atributos", () => {
    renderComTema(<CartaoComFarol data-testid="cartao" aria-label="Cartão" />);

    expect(screen.getByTestId("cartao").tagName).toBe("DIV");
    expect(screen.getByLabelText("Cartão")).toBeInTheDocument();
  });

  it("entrega o ref ao elemento", () => {
    const ref = createRef<HTMLDivElement>();
    renderComTema(<CartaoComFarol ref={ref}>Conteúdo</CartaoComFarol>);

    expect(ref.current).toHaveTextContent("Conteúdo");
  });
});
