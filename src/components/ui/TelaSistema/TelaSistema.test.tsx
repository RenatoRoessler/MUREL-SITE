import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { TelaSistema } from "./TelaSistema";

const imagem = { src: "/tela.webp", width: 1280, height: 800 };

describe("TelaSistema", () => {
  it("mostra a imagem com o texto alternativo informado", () => {
    renderComTema(<TelaSistema imagem={imagem} alt="Lista de veículos no pátio" />);
    expect(screen.getByRole("img", { name: "Lista de veículos no pátio" })).toBeInTheDocument();
  });
});
