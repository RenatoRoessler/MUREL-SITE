import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderComTema } from "@/test/render";
import { TelaSistema } from "./TelaSistema";

const paisagem = { src: "/tela.webp", width: 1280, height: 800 };
const retrato = { src: "/celular.webp", width: 720, height: 1558 };

describe("TelaSistema", () => {
  it("mostra a imagem com o texto alternativo informado", () => {
    renderComTema(<TelaSistema imagem={paisagem} alt="Lista de veículos no pátio" />);
    expect(screen.getByRole("img", { name: "Lista de veículos no pátio" })).toBeInTheDocument();
  });

  it("deixa o visor focável para rolar telas largas pelo teclado", () => {
    renderComTema(<TelaSistema imagem={paisagem} alt="Lista de veículos no pátio" />);
    expect(screen.getByRole("group", { name: "Lista de veículos no pátio" })).toHaveAttribute("tabindex", "0");
  });

  it("desenha a base do notebook só para telas em paisagem", () => {
    const larga = renderComTema(<TelaSistema imagem={paisagem} alt="Tela larga" />);
    expect(larga.container.querySelector('[aria-hidden="true"]')).not.toBeNull();
    larga.unmount();

    const celular = renderComTema(<TelaSistema imagem={retrato} alt="Tela de celular" />);
    expect(celular.container.querySelector('[aria-hidden="true"]')).toBeNull();
  });
});
