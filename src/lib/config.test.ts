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
});
