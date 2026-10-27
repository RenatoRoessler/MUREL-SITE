import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ambiente de testes", () => {
  it("renderiza um componente no jsdom", () => {
    render(<p>Murel</p>);
    expect(screen.getByText("Murel")).toBeInTheDocument();
  });
});
