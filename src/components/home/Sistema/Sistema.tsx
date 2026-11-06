import { Button } from "@/components/ui/Button/Button";
import { Section } from "@/components/ui/Section/Section";
import { urlAdesaoTeste } from "@/lib/config";
import type { PerfilSistema } from "@/types/sistema";
import { CarrosselTelas } from "./CarrosselTelas";
import { SeletorPerfil } from "./SeletorPerfil";
import { perfilInicial, perfis } from "./Sistema.data";
import { Chamada } from "./Sistema.styles";
import { TelaPerfil } from "./TelaPerfil";

type SistemaProps = {
  dados?: PerfilSistema[];
};

export function Sistema({ dados = perfis }: SistemaProps) {
  const paineis = dados.map((perfil) => ({
    id: perfil.id,
    rotulo: perfil.rotulo,
    resumo: perfil.resumo,
    conteudo: (
      <CarrosselTelas
        rotulo={`Telas do perfil ${perfil.rotulo}`}
        estreito={perfil.telas[0].imagem.height > perfil.telas[0].imagem.width}
        slides={perfil.telas.map((tela) => ({ id: tela.id, conteudo: <TelaPerfil tela={tela} /> }))}
      />
    ),
  }));

  return (
    <Section
      id="sistema"
      titulo="Tudo o que o pátio precisa, no mesmo sistema."
      lede="Escolha quem você é e veja as telas que essa pessoa usa, uma a uma."
    >
      <SeletorPerfil perfis={paineis} inicial={perfilInicial} rotulo="Perfil de usuário" />
      <Chamada>
        <Button href={urlAdesaoTeste}>Testar grátis</Button>
      </Chamada>
    </Section>
  );
}
