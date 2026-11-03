import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlAdesaoTeste } from "@/lib/config";
import { renderComTema } from "@/test/render";
import { Contato } from "./Contato";

describe("Contato", () => {
  it("oferece o teste grátis antes do WhatsApp", () => {
    renderComTema(<Contato />);
    const link = screen.getByRole("link", { name: "Testar grátis por 30 dias" });
    expect(link).toHaveAttribute("href", urlAdesaoTeste);

    const whatsapp = screen.getByRole("link", { name: "Chamar no WhatsApp" });
    expect(link.compareDocumentPosition(whatsapp) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
