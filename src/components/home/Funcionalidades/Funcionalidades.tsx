import { Funcionalidade } from "@/components/home/Funcionalidade/Funcionalidade";
import { funcionalidades } from "./Funcionalidades.data";

export function Funcionalidades() {
  return (
    <>
      {funcionalidades.map((dados, indice) => (
        <Funcionalidade key={dados.id} dados={dados} invertido={indice % 2 === 1} />
      ))}
    </>
  );
}
