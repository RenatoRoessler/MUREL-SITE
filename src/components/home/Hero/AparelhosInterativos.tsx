"use client";

import { type ReactNode, useRef } from "react";
import { useInclinacao } from "@/hooks/useInclinacao";
import { Aparelhos } from "./Hero.styles";

// Só o conjunto de telas do topo é Client: ele escuta o cursor para inclinar. O resto do Hero segue no servidor.
export function AparelhosInterativos({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useInclinacao(ref);

  return <Aparelhos ref={ref}>{children}</Aparelhos>;
}
