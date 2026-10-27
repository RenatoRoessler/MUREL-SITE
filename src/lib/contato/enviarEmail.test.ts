import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { CamposContato } from "@/types/contato";
import { enviarEmail } from "./enviarEmail";

const campos: CamposContato = {
  nome: "Maria Souza",
  patio: "Estacionamento Central",
  tipo: "valet",
  email: "maria@exemplo.com.br",
  telefone: "(11) 99999-9999",
  mensagem: "Quero conhecer o sistema.",
};

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubEnv("EMAIL_API_KEY", "chave-secreta");
  vi.stubEnv("EMAIL_REMETENTE", "Murel <site@murel.com.br>");
  vi.stubEnv("CONTATO_DESTINO", "contato@murel.com.br");
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => {});
  fetchMock.mockReset();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function corpoEnviado() {
  return JSON.parse(fetchMock.mock.calls[0][1].body as string);
}

describe("enviarEmail", () => {
  it("envia ao destino com reply_to e todos os campos", async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 200 });

    const resultado = await enviarEmail(campos);

    expect(resultado).toEqual({ ok: true });
    const [url, opcoes] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(opcoes.headers.Authorization).toBe("Bearer chave-secreta");
    const corpo = corpoEnviado();
    expect(corpo.to).toEqual(["contato@murel.com.br"]);
    expect(corpo.reply_to).toBe("maria@exemplo.com.br");
    expect(corpo.subject).toBe("Contato pelo site: Maria Souza (Estacionamento Central)");
    expect(corpo.text).toContain("Tipo de negócio: Valet");
    expect(corpo.text).toContain("Telefone: (11) 99999-9999");
    expect(corpo.text).toContain("Quero conhecer o sistema.");
  });

  it("omite reply_to quando não há e-mail", async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 200 });
    await enviarEmail({ ...campos, email: "" });
    expect(corpoEnviado()).not.toHaveProperty("reply_to");
  });

  it("não deixa quebra de linha no assunto", async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 200 });
    await enviarEmail({ ...campos, nome: "Maria\r\nBcc: alguem@x.com", patio: "" });
    expect(corpoEnviado().subject).toBe("Contato pelo site: Maria Bcc: alguem@x.com");
  });

  it("falha de forma controlada quando o provedor recusa", async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 422 });
    expect(await enviarEmail(campos)).toEqual({ ok: false });
  });

  it("falha de forma controlada em erro de rede ou timeout", async () => {
    fetchMock.mockRejectedValue(new DOMException("tempo esgotado", "TimeoutError"));
    expect(await enviarEmail(campos)).toEqual({ ok: false });
  });

  it("falha sem chamar o provedor quando a chave não está configurada", async () => {
    vi.stubEnv("EMAIL_API_KEY", "");
    expect(await enviarEmail(campos)).toEqual({ ok: false });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("não registra dados pessoais nos logs", async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 });
    await enviarEmail(campos);
    const registrado = JSON.stringify(vi.mocked(console.error).mock.calls);
    expect(registrado).not.toContain("Maria");
    expect(registrado).not.toContain("maria@exemplo.com.br");
    expect(registrado).not.toContain("chave-secreta");
  });
});
