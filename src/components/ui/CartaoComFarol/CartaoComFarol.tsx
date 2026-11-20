"use client";

import { type ComponentPropsWithRef, type ElementType, useCallback, useRef } from "react";
import { useLuzDeFarol } from "@/hooks/useLuzDeFarol";
import { Base } from "./CartaoComFarol.styles";

type CartaoComFarolProps = ComponentPropsWithRef<"div"> & {
  // Elemento (ou componente estilizado) renderizado: mantém o HTML igual ao de antes (li, article...).
  as?: ElementType;
};

// Cartão com luz de farol que segue o cursor (só com mouse). Aceita `as`, `className` e `ref`, para ser a base
// de um styled(CartaoComFarol).
export function CartaoComFarol({ as, ref, ...resto }: CartaoComFarolProps) {
  const proprio = useRef<HTMLElement | null>(null);
  useLuzDeFarol(proprio);

  const juntar = useCallback(
    (no: HTMLDivElement | null) => {
      proprio.current = no;
      if (typeof ref === "function") ref(no);
      else if (ref) ref.current = no;
    },
    [ref],
  );

  return <Base {...resto} as={as} ref={juntar} />;
}
