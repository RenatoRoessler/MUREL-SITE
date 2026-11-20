import type { ComponentPropsWithoutRef } from "react";
import {
  BotaoAcao,
  BotaoLink,
  type TamanhoBotao,
  type VarianteBotao,
} from "./Button.styles";

type PropsComuns = {
  variante?: VarianteBotao;
  tamanho?: TamanhoBotao;
  // Faixa de luz que cruza o botão algumas vezes ao carregar. Para o CTA principal.
  brilho?: boolean;
};

type PropsLink = PropsComuns & ComponentPropsWithoutRef<"a"> & { href: string };
type PropsBotao = PropsComuns & ComponentPropsWithoutRef<"button"> & { href?: undefined };

export function Button(props: PropsLink | PropsBotao) {
  const { variante = "primary", tamanho = "md", brilho = false, ...resto } = props;

  if (props.href !== undefined) {
    return (
      <BotaoLink
        $variante={variante}
        $tamanho={tamanho}
      $brilho={brilho}
        {...(resto as ComponentPropsWithoutRef<"a">)}
      />
    );
  }

  return (
    <BotaoAcao
      $variante={variante}
      $tamanho={tamanho}
      $brilho={brilho}
      {...(resto as ComponentPropsWithoutRef<"button">)}
    />
  );
}
