import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { CamposContato } from "@/types/contato";

const sendMail = vi.fn();
const createTransport = vi.fn(() => ({ sendMail }));

vi.mock("nodemailer", () => ({ default: { createTransport } }));

const { enviarEmail } = await import("./enviarEmail");

const campos: CamposContato = {
  nome: "Maria Souza",
  patio: "Estacionamento Central",
  tipo: "valet",
  email: "maria@exemplo.com.br",
  telefone: "(11) 99999-9999",
  mensagem: "Quero conhecer o sistema.",
};

beforeEach(() => {
  vi.stubEnv("SMTP_USER", "site@murel.com.br");
  vi.stubEnv("SMTP_PASSWORD", "senha-de-app");
  vi.stubEnv("SMTP_HOST", "");
  vi.stubEnv("SMTP_PORT", "");
  vi.stubEnv("EMAIL_REMETENTE", "Murel <site@murel.com.br>");
  vi.stubEnv("CONTATO_DESTINO", "contato@murel.com.br");
  vi.spyOn(console, "error").mockImplementation(() => {});
  sendMail.mockReset().mockResolvedValue({});
  createTransport.mockClear();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("enviarEmail", () => {
  it("usa o SMTP do Zoho por padrão, com SSL na porta 465", async () => {
    await enviarEmail(campos);
    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: { user: "site@murel.com.br", pass: "senha-de-app" },
      }),
    );
  });

  it("aceita outro host e usa STARTTLS na porta 587", async () => {
    vi.stubEnv("SMTP_HOST", "smtppro.zoho.com");
    vi.stubEnv("SMTP_PORT", "587");
    await enviarEmail(campos);
    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({ host: "smtppro.zoho.com", port: 587, secure: false }),
    );
  });

  it("envia ao destino com replyTo e todos os campos", async () => {
    const resultado = await enviarEmail(campos);

    expect(resultado).toEqual({ ok: true });
    const mensagem = sendMail.mock.calls[0][0];
    expect(mensagem.from).toBe("Murel <site@murel.com.br>");
    expect(mensagem.to).toBe("contato@murel.com.br");
    expect(mensagem.replyTo).toBe("maria@exemplo.com.br");
    expect(mensagem.subject).toBe("Contato pelo site: Maria Souza (Estacionamento Central)");
    expect(mensagem.text).toContain("Tipo de negócio: Valet");
    expect(mensagem.text).toContain("Telefone: (11) 99999-9999");
    expect(mensagem.text).toContain("Quero conhecer o sistema.");
  });

  it("usa o usuário SMTP como remetente quando EMAIL_REMETENTE não existe", async () => {
    vi.stubEnv("EMAIL_REMETENTE", "");
    await enviarEmail(campos);
    expect(sendMail.mock.calls[0][0].from).toBe("site@murel.com.br");
  });

  it("omite replyTo quando não há e-mail", async () => {
    await enviarEmail({ ...campos, email: "" });
    expect(sendMail.mock.calls[0][0]).not.toHaveProperty("replyTo");
  });

  it("não deixa quebra de linha no assunto", async () => {
    await enviarEmail({ ...campos, nome: "Maria\r\nBcc: alguem@x.com", patio: "" });
    expect(sendMail.mock.calls[0][0].subject).toBe("Contato pelo site: Maria Bcc: alguem@x.com");
  });

  it("falha de forma controlada quando o SMTP recusa", async () => {
    sendMail.mockRejectedValue(Object.assign(new Error("535 autenticação"), { code: "EAUTH" }));
    expect(await enviarEmail(campos)).toEqual({ ok: false });
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("EAUTH"));
  });

  it("falha sem tentar enviar quando faltam credenciais", async () => {
    vi.stubEnv("SMTP_PASSWORD", "");
    expect(await enviarEmail(campos)).toEqual({ ok: false });
    expect(createTransport).not.toHaveBeenCalled();
  });

  it("não registra dados pessoais nem a senha nos logs", async () => {
    sendMail.mockRejectedValue(new Error("falhou para maria@exemplo.com.br"));
    await enviarEmail(campos);
    const registrado = JSON.stringify(vi.mocked(console.error).mock.calls);
    expect(registrado).not.toContain("Maria");
    expect(registrado).not.toContain("maria@exemplo.com.br");
    expect(registrado).not.toContain("senha-de-app");
  });
});
