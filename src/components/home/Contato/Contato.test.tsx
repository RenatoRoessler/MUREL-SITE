import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { urlAdesaoTeste } from "@/lib/config";
import { ofertaEmPromocao } from "@/test/oferta";
import { renderComTema } from "@/test/render";
import { Contato } from "./Contato";

describe("Contato", () => {
  it("oferece o teste grátis antes do WhatsApp", () => {
    renderComTema(<Contato teste={ofertaEmPromocao.teste} />);
    const link = screen.getByRole("link", { name: "Testar grátis por 1 mês" });
    expect(link).toHaveAttribute("href", urlAdesaoTeste);

    const whatsapp = screen.getByRole("link", { name: "Chamar no WhatsApp" });
    expect(link.compareDocumentPosition(whatsapp) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("usa a duração do teste vinda do back-end e, sem ela, não cita número", () => {
    const { unmount } = renderComTema(<Contato teste={{ duracaoMeses: 1 }} />);
    expect(screen.getByText("Use o sistema completo por 1 mês, sem cartão e sem compromisso.")).toBeInTheDocument();
    unmount();

    renderComTema(<Contato teste={null} />);
    expect(screen.getByRole("link", { name: "Testar grátis" })).toHaveAttribute("href", urlAdesaoTeste);
    expect(screen.queryByText(/\d+ m[êe]s/)).not.toBeInTheDocument();
  });
});
