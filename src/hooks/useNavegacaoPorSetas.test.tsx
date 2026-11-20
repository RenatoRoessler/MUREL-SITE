import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { useNavegacaoPorSetas } from "./useNavegacaoPorSetas";

function Lista({ orientacao }: { orientacao: "horizontal" | "vertical" }) {
  const [ativo, setAtivo] = useState(0);
  const { registrar, aoTeclar } = useNavegacaoPorSetas<HTMLButtonElement>(3, setAtivo, orientacao);

  return (
    <div>
      {["Um", "Dois", "Três"].map((nome, indice) => (
        <button key={nome} ref={registrar(indice)} aria-pressed={ativo === indice} onKeyDown={(evento) => aoTeclar(evento, indice)}>
          {nome}
        </button>
      ))}
    </div>
  );
}

describe("useNavegacaoPorSetas", () => {
  it("na horizontal, as setas esquerda e direita trocam o item e mandam o foco, com volta nas pontas", () => {
    render(<Lista orientacao="horizontal" />);

    fireEvent.keyDown(screen.getByRole("button", { name: "Um" }), { key: "ArrowRight" });
    expect(screen.getByRole("button", { name: "Dois" })).toHaveFocus();
    expect(screen.getByRole("button", { name: "Dois" })).toHaveAttribute("aria-pressed", "true");

    fireEvent.keyDown(screen.getByRole("button", { name: "Dois" }), { key: "ArrowLeft" });
    fireEvent.keyDown(screen.getByRole("button", { name: "Um" }), { key: "ArrowLeft" });
    expect(screen.getByRole("button", { name: "Três" })).toHaveFocus();
  });

  it("na vertical, usa as setas para cima e para baixo e ignora as horizontais", () => {
    render(<Lista orientacao="vertical" />);
    const um = screen.getByRole("button", { name: "Um" });

    fireEvent.keyDown(um, { key: "ArrowRight" });
    expect(um).toHaveAttribute("aria-pressed", "true");

    fireEvent.keyDown(um, { key: "ArrowDown" });
    expect(screen.getByRole("button", { name: "Dois" })).toHaveFocus();
  });

  it("Home e End vão ao primeiro e ao último item", () => {
    render(<Lista orientacao="horizontal" />);
    fireEvent.keyDown(screen.getByRole("button", { name: "Um" }), { key: "End" });
    expect(screen.getByRole("button", { name: "Três" })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole("button", { name: "Três" }), { key: "Home" });
    expect(screen.getByRole("button", { name: "Um" })).toHaveFocus();
  });
});
