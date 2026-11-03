import { ItemGarantia, ListaGarantias } from "./Garantias.styles";

type GarantiasProps = {
  itens: readonly string[];
  rotulo: string;
};

function Marca() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10.5l4 4 8-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Garantias({ itens, rotulo }: GarantiasProps) {
  return (
    <ListaGarantias aria-label={rotulo}>
      {itens.map((item) => (
        <ItemGarantia key={item}>
          <Marca />
          {item}
        </ItemGarantia>
      ))}
    </ListaGarantias>
  );
}
