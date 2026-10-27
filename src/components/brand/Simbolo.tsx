import { useId } from "react";
import { Carro } from "./Simbolo.styles";

type SimboloProps = {
  className?: string;
  animado?: boolean;
  titulo?: string;
};

export function Simbolo({
  className,
  animado = false,
  titulo = "Símbolo Murel: três vagas formando um M, com um carro na vaga do meio",
}: SimboloProps) {
  const idMascara = useId();

  return (
    <svg
      className={className}
      viewBox="0 0 240 160"
      role="img"
      aria-label={titulo}
      overflow="visible"
    >
      <mask id={idMascara} maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="160">
        <rect width="240" height="160" fill="#fff" />
        <path
          d="M108 87H132L129.5 76Q120 72.5 110.5 76Z"
          fill="#000"
          stroke="#000"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M110 112H130L128 119Q120 121 112 119Z"
          fill="#000"
          stroke="#000"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </mask>
      <path
        d="M20 140V24H220V140M82 24V140M158 24V140"
        fill="none"
        stroke="#FFC20E"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Carro $animado={animado}>
        <rect x="102" y="62" width="36" height="66" rx="12" fill="#FFC20E" mask={`url(#${idMascara})`} />
      </Carro>
    </svg>
  );
}
