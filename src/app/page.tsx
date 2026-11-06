import { ComoFunciona } from "@/components/home/ComoFunciona/ComoFunciona";
import { Contato } from "@/components/home/Contato/Contato";
import { Diferencial } from "@/components/home/Diferencial/Diferencial";
import { Faq } from "@/components/home/Faq/Faq";
import { Hero } from "@/components/home/Hero/Hero";
import { Planos } from "@/components/home/Planos/Planos";
import { Sistema } from "@/components/home/Sistema/Sistema";
import { BotaoWhatsapp } from "@/components/layout/BotaoWhatsapp/BotaoWhatsapp";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { emailContato, urlSite } from "@/lib/config";

const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Murel",
  url: urlSite,
  email: emailContato,
  description:
    "Sistema para estacionamentos, valets e lava-rápidos, com pátio, caixa, tabela de preços, mensalistas e empresas conveniadas. Ticket 100% digital, sem impressora e sem cadastro do cliente.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dadosEstruturados).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main id="conteudo">
        <Hero />
        <Diferencial />
        <Sistema />
        <ComoFunciona />
        <Planos />
        <Faq />
        <Contato />
      </main>
      <Footer />
      <BotaoWhatsapp />
    </>
  );
}
