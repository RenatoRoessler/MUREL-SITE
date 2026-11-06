import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import type { TelaPerfil as TelaPerfilDados } from "@/types/sistema";
import { TelaPerfil } from "./TelaPerfil";

const tela: TelaPerfilDados = {
  id: "patio",
  imagem: { src: "/patio.webp", width: 720, height: 1558 },
  alt: "Tela do pátio no celular, com as vagas ocupadas.",
  titulo: "Pátio",
  explicacao: "Mostra quantas vagas estão ocupadas e quantas estão livres.",
};

describe("TelaPerfil", () => {
  it("mostra a imagem com o texto alternativo, o título e a explicação", () => {
    renderComTema(<TelaPerfil tela={tela} />);
    expect(screen.getByRole("img", { name: tela.alt })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Pátio" })).toBeInTheDocument();
    expect(screen.getByText(tela.explicacao)).toBeInTheDocument();
  });

  it("aceita imagem em paisagem, como as telas do gestor", () => {
    const paisagem = { ...tela, imagem: { src: "/dashboard.webp", width: 1280, height: 800 } };
    renderComTema(<TelaPerfil tela={paisagem} />);
    expect(screen.getByRole("img", { name: tela.alt })).toBeInTheDocument();
  });
});
