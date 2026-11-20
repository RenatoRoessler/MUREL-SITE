"use client";

import { type ComponentPropsWithoutRef, type ElementType, useEffect, useRef, useState } from "react";
import { Alvo } from "./Revelar.styles";

export type ModoRevelar = "proprio" | "filhos";

type RevelarProps = ComponentPropsWithoutRef<"div"> & {
  // Elemento (ou componente estilizado) que será renderizado: mantém o HTML igual ao de antes (ul, li, details).
  as?: ElementType;
  // "proprio" anima o próprio elemento; "filhos" anima cada filho direto, em sequência.
  modo?: ModoRevelar;
};

export function Revelar({ as, modo = "proprio", ...resto }: RevelarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    // Sem IntersectionObserver o conteúdo não pode ficar escondido: mostra no próximo quadro.
    if (typeof IntersectionObserver === "undefined") {
      const quadro = requestAnimationFrame(() => setVisivel(true));
      return () => cancelAnimationFrame(quadro);
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        setVisivel(true);
        observador.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    observador.observe(elemento);

    return () => observador.disconnect();
  }, []);

  return <Alvo {...resto} as={as} ref={ref} data-modo={modo} data-estado={visivel ? "visivel" : "pendente"} />;
}
