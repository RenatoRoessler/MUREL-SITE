"use client";

import { type RefObject, useEffect } from "react";
import { theme } from "@/styles/theme";

const CONSULTA = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const { alcance, forca, maximo } = theme.motion.cursor.magnetismo;

const limitar = (valor: number) => Math.max(-maximo, Math.min(maximo, valor));

// Botão magnético: quando o cursor chega a `alcance` px do elemento, ele anda até `maximo` px na direção do
// cursor (--mx e --my). Ao se afastar, as variáveis saem e o CSS devolve o botão com um retorno elástico.
// Só mexe em variáveis CSS: o layout e a área de clique não mudam.
export function useMagnetismo(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const elemento = ref.current;
    if (!elemento || typeof window.matchMedia !== "function" || !window.matchMedia(CONSULTA).matches) return;

    let quadro = 0;
    let agendado = false;
    let ponteiro: { x: number; y: number } | null = null;
    let deslocado = { x: 0, y: 0 };
    let perto = false;

    const soltar = () => {
      if (!perto) return;
      perto = false;
      deslocado = { x: 0, y: 0 };
      elemento.removeAttribute("data-magnetico");
      elemento.style.removeProperty("--mx");
      elemento.style.removeProperty("--my");
    };

    const atualizar = () => {
      agendado = false;
      if (!ponteiro) return;

      const caixa = elemento.getBoundingClientRect();
      // O centro "de repouso" desconta o deslocamento atual, para o botão não fugir do próprio cursor.
      const centroX = caixa.left + caixa.width / 2 - deslocado.x;
      const centroY = caixa.top + caixa.height / 2 - deslocado.y;
      const foraX = Math.max(Math.abs(ponteiro.x - centroX) - caixa.width / 2, 0);
      const foraY = Math.max(Math.abs(ponteiro.y - centroY) - caixa.height / 2, 0);

      if (Math.hypot(foraX, foraY) > alcance) {
        soltar();
        return;
      }

      perto = true;
      deslocado = { x: limitar((ponteiro.x - centroX) * forca), y: limitar((ponteiro.y - centroY) * forca) };
      elemento.setAttribute("data-magnetico", "ativo");
      elemento.style.setProperty("--mx", `${deslocado.x}px`);
      elemento.style.setProperty("--my", `${deslocado.y}px`);
    };

    const mover = (evento: PointerEvent) => {
      ponteiro = { x: evento.clientX, y: evento.clientY };
      if (agendado) return;
      agendado = true;
      quadro = requestAnimationFrame(atualizar);
    };

    const sair = () => {
      ponteiro = null;
      soltar();
    };

    document.addEventListener("pointermove", mover, { passive: true });
    document.documentElement.addEventListener("pointerleave", sair);

    return () => {
      if (agendado) cancelAnimationFrame(quadro);
      document.removeEventListener("pointermove", mover);
      document.documentElement.removeEventListener("pointerleave", sair);
      soltar();
    };
  }, [ref]);
}
