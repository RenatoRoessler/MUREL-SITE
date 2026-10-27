export type TipoNegocio = "estacionamento" | "valet" | "lava-rapido" | "mais-de-um";

export type CamposContato = {
  nome: string;
  patio: string;
  tipo: TipoNegocio | "";
  email: string;
  telefone: string;
  mensagem: string;
};

export type ErrosContato = Partial<Record<keyof CamposContato, string>>;

export type EstadoContato =
  | { status: "inicial" }
  | { status: "erro-validacao"; erros: ErrosContato; valores: CamposContato }
  | { status: "falha-envio"; valores: CamposContato }
  | { status: "enviado" };
