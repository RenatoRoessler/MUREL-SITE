import { afterEach, describe, expect, it, vi } from "vitest";

async function carregar() {
  vi.resetModules();
  return import("./config");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("config", () => {
  it("usa NEXT_PUBLIC_APP_URL como acesso", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://app.murel.com.br");
    const { urlAcesso } = await carregar();
    expect(urlAcesso).toBe("https://app.murel.com.br");
  });

  it("remove barras finais da URL base", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://app.murel.com.br/");
    const { urlAcesso } = await carregar();
    expect(urlAcesso).toBe("https://app.murel.com.br");
  });

  it("cai para localhost quando a variável não existe", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", undefined);
    const { urlAcesso } = await carregar();
    expect(urlAcesso).toBe("http://localhost:3000");
  });

  it("expõe o e-mail de contato", async () => {
    const { emailContato } = await carregar();
    expect(emailContato).toBe("contato@murel.com.br");
  });

  it("monta o link do WhatsApp com número e mensagem codificada", async () => {
    const { mensagemWhatsapp, numeroWhatsapp, urlWhatsapp } = await carregar();
    expect(numeroWhatsapp).toBe("5519992215384");
    expect(urlWhatsapp).toBe(
      `https://wa.me/5519992215384?text=${encodeURIComponent(mensagemWhatsapp)}`,
    );
    expect(urlWhatsapp).not.toContain(" ");
  });

  it("expõe o número do WhatsApp formatado e o rótulo do botão", async () => {
    const { numeroWhatsappExibicao, rotuloWhatsapp } = await carregar();
    expect(numeroWhatsappExibicao).toBe("(19) 99221-5384");
    expect(rotuloWhatsapp).toBe("Estamos online!");
  });
});
