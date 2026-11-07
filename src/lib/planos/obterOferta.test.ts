import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const cacheLife = vi.fn();
vi.mock("next/cache", () => ({ cacheLife }));

const { obterOferta } = await import("./obterOferta");

const mensal = {
  tipoPeriodoPlano: 1,
  tipoPeriodoPlanoDescricao: "Mensal",
  validadeDuracaoMeses: 1,
  valor: 99.9,
  valorAtual: 69.9,
  emPromocao: true,
  promocaoFim: "2027-06-30T00:00:00",
  ordemExibicao: 2,
};

const resposta = (corpo: unknown, init?: ResponseInit) => Response.json(corpo, init);

describe("obterOferta", () => {
  const fetchFalso = vi.fn();

  beforeEach(() => {
    vi.stubEnv("MUREL_API_URL", "https://api.exemplo.com/api/v1/");
    vi.stubGlobal("fetch", fetchFalso);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    fetchFalso.mockReset();
    cacheLife.mockReset();
  });

  it("consulta GET /Plano na URL configurada, sem barra duplicada", async () => {
    fetchFalso.mockResolvedValue(resposta([mensal]));
    const oferta = await obterOferta();

    expect(fetchFalso).toHaveBeenCalledOnce();
    const [url, init] = fetchFalso.mock.calls[0];
    expect(url).toBe("https://api.exemplo.com/api/v1/Plano");
    expect(init.headers).toEqual({ accept: "application/json" });
    expect(init.signal).toBeInstanceOf(AbortSignal);
    expect(oferta?.planos[0]).toMatchObject({ nome: "Mensal", valorAtual: 69.9 });
  });

  it("guarda a oferta por 5 minutos", async () => {
    fetchFalso.mockResolvedValue(resposta([mensal]));
    await obterOferta();
    expect(cacheLife).toHaveBeenCalledTimes(1);
    expect(cacheLife).toHaveBeenCalledWith({ stale: 300, revalidate: 300, expire: 86400 });
  });

  describe("quando a consulta falha", () => {
    const encurtaOCache = () =>
      expect(cacheLife).toHaveBeenLastCalledWith({ stale: 300, revalidate: 60, expire: 86400 });

    it("devolve null se a variável de ambiente falta", async () => {
      vi.stubEnv("MUREL_API_URL", "");
      expect(await obterOferta()).toBeNull();
      expect(fetchFalso).not.toHaveBeenCalled();
      encurtaOCache();
    });

    it("devolve null em erro de rede ou tempo esgotado", async () => {
      fetchFalso.mockRejectedValue(new DOMException("tempo esgotado", "TimeoutError"));
      expect(await obterOferta()).toBeNull();
      encurtaOCache();
    });

    it("devolve null se a resposta não é ok", async () => {
      fetchFalso.mockResolvedValue(resposta({}, { status: 500 }));
      expect(await obterOferta()).toBeNull();
      encurtaOCache();
    });

    it("devolve null se o JSON é inválido", async () => {
      fetchFalso.mockResolvedValue(new Response("<html>", { status: 200 }));
      expect(await obterOferta()).toBeNull();
      encurtaOCache();
    });

    it("devolve null se a resposta não traz plano pago", async () => {
      fetchFalso.mockResolvedValue(resposta([]));
      expect(await obterOferta()).toBeNull();
      encurtaOCache();
    });
  });
});
