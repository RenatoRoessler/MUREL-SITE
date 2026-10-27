import { beforeEach, describe, expect, it } from "vitest";
import { podeEnviar, reiniciarLimite } from "./limitarEnvios";

const MINUTO = 60 * 1000;

beforeEach(() => {
  reiniciarLimite();
});

describe("podeEnviar", () => {
  it("permite até 5 envios na janela", () => {
    for (let i = 0; i < 5; i++) {
      expect(podeEnviar("1.1.1.1", i * MINUTO)).toBe(true);
    }
  });

  it("bloqueia o sexto envio dentro da janela", () => {
    for (let i = 0; i < 5; i++) podeEnviar("1.1.1.1", i * MINUTO);
    expect(podeEnviar("1.1.1.1", 6 * MINUTO)).toBe(false);
  });

  it("não mistura IPs diferentes", () => {
    for (let i = 0; i < 5; i++) podeEnviar("1.1.1.1", 0);
    expect(podeEnviar("2.2.2.2", 0)).toBe(true);
  });

  it("libera de novo quando a janela renova", () => {
    for (let i = 0; i < 5; i++) podeEnviar("1.1.1.1", 0);
    expect(podeEnviar("1.1.1.1", 9 * MINUTO)).toBe(false);
    expect(podeEnviar("1.1.1.1", 10 * MINUTO + 1)).toBe(true);
  });

  it("tentativas bloqueadas não prolongam o bloqueio", () => {
    for (let i = 0; i < 5; i++) podeEnviar("1.1.1.1", 0);
    podeEnviar("1.1.1.1", 9 * MINUTO);
    expect(podeEnviar("1.1.1.1", 10 * MINUTO + 1)).toBe(true);
  });
});
