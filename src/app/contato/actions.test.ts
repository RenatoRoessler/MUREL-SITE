import { beforeEach, describe, expect, it, vi } from "vitest";
import type { EstadoContato } from "@/types/contato";

const enviarEmail = vi.fn();
const podeEnviar = vi.fn();

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" }),
}));
vi.mock("@/lib/contato/enviarEmail", () => ({ enviarEmail }));
vi.mock("@/lib/contato/limitarEnvios", () => ({ podeEnviar }));

const { enviarContato } = await import("./actions");

const inicial: EstadoContato = { status: "inicial" };

function formulario(sobrescrever: Record<string, string> = {}) {
  const dados = {
    nome: "Maria Souza",
    patio: "Estacionamento Central",
    tipo: "estacionamento",
    email: "maria@exemplo.com.br",
    telefone: "",
    mensagem: "Quero conhecer o sistema para o meu pátio.",
    site: "",
    ...sobrescrever,
  };
  const formData = new FormData();
  for (const [chave, valor] of Object.entries(dados)) formData.set(chave, valor);
  return formData;
}

beforeEach(() => {
  enviarEmail.mockReset().mockResolvedValue({ ok: true });
  podeEnviar.mockReset().mockReturnValue(true);
});

describe("enviarContato", () => {
  it("envia e devolve 'enviado' quando tudo está certo", async () => {
    const estado = await enviarContato(inicial, formulario());
    expect(estado).toEqual({ status: "enviado" });
    expect(enviarEmail).toHaveBeenCalledOnce();
    expect(enviarEmail.mock.calls[0][0].nome).toBe("Maria Souza");
    expect(podeEnviar).toHaveBeenCalledWith("203.0.113.7");
  });

  it("devolve erros por campo e os valores digitados", async () => {
    const estado = await enviarContato(inicial, formulario({ nome: "", email: "", telefone: "" }));
    expect(estado.status).toBe("erro-validacao");
    if (estado.status === "erro-validacao") {
      expect(estado.erros.nome).toBeDefined();
      expect(estado.erros.email).toBeDefined();
      expect(estado.valores.mensagem).toBe("Quero conhecer o sistema para o meu pátio.");
    }
    expect(enviarEmail).not.toHaveBeenCalled();
  });

  it("devolve falha-envio com os valores quando o provedor falha", async () => {
    enviarEmail.mockResolvedValue({ ok: false });
    const estado = await enviarContato(inicial, formulario());
    expect(estado.status).toBe("falha-envio");
    if (estado.status === "falha-envio") expect(estado.valores.nome).toBe("Maria Souza");
  });

  it("finge sucesso e não envia quando o honeypot está preenchido", async () => {
    const estado = await enviarContato(inicial, formulario({ site: "http://spam.example" }));
    expect(estado).toEqual({ status: "enviado" });
    expect(enviarEmail).not.toHaveBeenCalled();
  });

  it("não envia quando o limite do visitante foi excedido", async () => {
    podeEnviar.mockReturnValue(false);
    const estado = await enviarContato(inicial, formulario());
    expect(estado.status).toBe("falha-envio");
    expect(enviarEmail).not.toHaveBeenCalled();
  });
});
