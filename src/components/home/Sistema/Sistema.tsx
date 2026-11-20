import { Button } from "@/components/ui/Button/Button";
import { Section } from "@/components/ui/Section/Section";
import { urlAdesaoTeste } from "@/lib/config";
import type { PerfilSistema } from "@/types/sistema";
import { SeletorPerfil } from "./SeletorPerfil";
import { perfilInicial, perfis } from "./Sistema.data";
import { Chamada } from "./Sistema.styles";
import { TelaPerfil } from "./TelaPerfil";
import { TelasDoPerfil } from "./TelasDoPerfil";

type SistemaProps = {
  dados?: PerfilSistema[];
};

export function Sistema({ dados = perfis }: SistemaProps) {
  const paineis = dados.map((perfil) => ({
    id: perfil.id,
    rotulo: perfil.rotulo,
    resumo: perfil.resumo,
    conteudo: (
      <TelasDoPerfil
        rotulo={perfil.rotulo}
        estreito={perfil.telas[0].imagem.height > perfil.telas[0].imagem.width}
        telas={perfil.telas.map((tela) => ({ id: tela.id, titulo: tela.titulo, conteudo: <TelaPerfil tela={tela} /> }))}
      />
    ),
  }));

  return (
    <Section
      id="sistema"
      fundo="alternado"
      titulo="Tudo o que o pátio precisa, no mesmo sistema."
      lede="Escolha quem você é e veja as telas que essa pessoa usa, uma a uma."
    >
      <SeletorPerfil perfis={paineis} inicial={perfilInicial} rotulo="Perfil de usuário" />
      <Chamada>
        <Button href={urlAdesaoTeste}>Experimente no seu pátio</Button>
      </Chamada>
    </Section>
  );
}
