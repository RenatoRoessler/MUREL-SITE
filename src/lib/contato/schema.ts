import { z } from "zod";
import type { CamposContato, ErrosContato } from "@/types/contato";

const digitos = (valor: string) => valor.replace(/\D/g, "");

export const contatoSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(2, "Informe seu nome.")
      .max(100, "O nome pode ter até 100 caracteres."),
    patio: z.string().trim().max(100, "O nome do pátio pode ter até 100 caracteres."),
    tipo: z.enum(["", "estacionamento", "valet", "lava-rapido", "mais-de-um"], {
      error: "Escolha uma das opções.",
    }),
    email: z
      .string()
      .trim()
      .refine((valor) => valor === "" || z.email().safeParse(valor).success, {
        error: "Esse e-mail não parece certo. Confira e tente de novo.",
      }),
    telefone: z
      .string()
      .trim()
      .refine(
        (valor) => {
          if (valor === "") return true;
          const total = digitos(valor).length;
          return total >= 10 && total <= 13;
        },
        { error: "Informe o telefone com DDD, por exemplo (11) 99999-9999." },
      ),
    mensagem: z
      .string()
      .trim()
      .min(10, "Escreva uma mensagem com pelo menos 10 caracteres.")
      .max(2000, "A mensagem pode ter até 2000 caracteres."),
  })
  .refine((campos) => campos.email !== "" || campos.telefone !== "", {
    path: ["email"],
    error: "Informe um e-mail ou um telefone para a gente responder.",
  });

export type ResultadoValidacao =
  | { sucesso: true; dados: CamposContato }
  | { sucesso: false; erros: ErrosContato };

export function validarContato(entrada: unknown): ResultadoValidacao {
  const resultado = contatoSchema.safeParse(entrada);
  if (resultado.success) return { sucesso: true, dados: resultado.data };

  const erros: ErrosContato = {};
  for (const problema of resultado.error.issues) {
    const campo = problema.path[0] as keyof CamposContato | undefined;
    if (campo && !erros[campo]) erros[campo] = problema.message;
  }
  return { sucesso: false, erros };
}
