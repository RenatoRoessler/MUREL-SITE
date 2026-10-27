import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({ variable: "--font-plus-jakarta" }),
  JetBrains_Mono: () => ({ variable: "--font-jetbrains" }),
}));
vi.mock("@/lib/registry", () => ({ default: () => null }));

const { metadata } = await import("./layout");
const { default: robots } = await import("./robots");
const { default: sitemap } = await import("./sitemap");
const { urlSite } = await import("@/lib/config");

describe("SEO e compartilhamento", () => {
  it("define título, descrição, Open Graph e Twitter no tom da marca", () => {
    expect(metadata.title).toBe("Murel: seu pátio sob controle");
    expect(String(metadata.description)).toMatch(/estacionamentos, valets e lava-rápidos/i);
    expect(metadata.openGraph).toMatchObject({ locale: "pt_BR", siteName: "Murel" });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(String(metadata.metadataBase)).toContain(new URL(urlSite).host);
  });

  it("não usa jargão proibido nos textos de compartilhamento", () => {
    const texto = JSON.stringify(metadata);
    expect(texto).not.toMatch(/plataforma|solução|ecossistema|revolucionári/i);
  });

  it("robots libera o site e aponta o sitemap", () => {
    const regras = robots();
    expect(regras.rules).toMatchObject({ userAgent: "*", allow: "/" });
    expect(regras.sitemap).toBe(`${urlSite}/sitemap.xml`);
  });

  it("sitemap lista a página inicial", () => {
    expect(sitemap().map((entrada) => entrada.url)).toEqual([urlSite]);
  });
});
