import { Button } from "@/components/ui/Button/Button";
import { IconeWhatsapp } from "@/components/ui/IconeWhatsapp/IconeWhatsapp";
import { urlAdesaoTeste, urlWhatsapp } from "@/lib/config";
import { Cartao, Nome, Regra } from "./CartaoPlano.styles";
import { Botoes } from "./PlanoIndisponivel.styles";

// Aparece no lugar do cartão quando os planos não puderam ser carregados. Sem preço, de propósito:
// o site não guarda cópia do valor para nunca divergir do que é cobrado.
export function PlanoIndisponivel() {
  return (
    <Cartao>
      <Nome>Os valores não carregaram agora</Nome>
      <Regra>Comece pelo teste grátis ou fale com a equipe.</Regra>
      <Botoes>
        <Button href={urlAdesaoTeste}>Começar meu teste grátis</Button>
        <Button href={urlWhatsapp} variante="whatsapp" target="_blank" rel="noopener noreferrer">
          <IconeWhatsapp />
          Chamar no WhatsApp
        </Button>
      </Botoes>
    </Cartao>
  );
}
