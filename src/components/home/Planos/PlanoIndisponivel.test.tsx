import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlAdesaoTeste, urlWhatsapp } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { PlanoIndisponivel } from "./PlanoIndisponivel";

describe("PlanoIndisponivel", () => {
  it("avisa que os valores não carregaram e aponta o teste grátis e a equipe", () => {
    renderComTema(<PlanoIndisponivel />);
    expect(screen.getByText("Os valores não carregaram agora")).toBeInTheDocument();
    expect(screen.getByText("Comece pelo mês grátis ou fale com a equipe.")).toBeInTheDocument();
  });

  it("não mostra preço nem duração do teste", () => {
    const { container } = renderComTema(<PlanoIndisponivel />);
    expect(container.textContent).not.toMatch(/R\$|\d/);
  });

  it("leva o teste à adesão Trial e o WhatsApp à conversa com a equipe", () => {
    renderComTema(<PlanoIndisponivel />);
    expect(screen.getByRole("link", { name: "Começar meu mês grátis" })).toHaveAttribute(
      "href",
      urlAdesaoTeste,
    );
    expect(screen.getByRole("link", { name: "Chamar no WhatsApp" })).toHaveAttribute("href", urlWhatsapp);
  });
});
