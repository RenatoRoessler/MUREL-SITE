import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { Button } from "./Button";
import { BotaoMagnetico } from "./BotaoMagnetico";

describe("BotaoMagnetico", () => {
  it("mantém o botão e o link como são, só envolvidos", () => {
    renderComTema(
      <BotaoMagnetico>
        <Button href="#contato">Falar com a equipe</Button>
      </BotaoMagnetico>,
    );

    expect(screen.getByRole("link", { name: "Falar com a equipe" })).toHaveAttribute("href", "#contato");
  });
});
