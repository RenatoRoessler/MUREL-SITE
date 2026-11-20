"use client";

import { type ReactNode, useRef } from "react";
import { useMagnetismo } from "@/hooks/useMagnetismo";
import { Casca } from "./BotaoMagnetico.styles";

// Envolve um Button e o faz seguir o cursor de leve (só com mouse). Fica separado do Button para ele continuar
// sem JavaScript de cliente nas outras ocorrências.
export function BotaoMagnetico({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  useMagnetismo(ref);

  return <Casca ref={ref}>{children}</Casca>;
}
