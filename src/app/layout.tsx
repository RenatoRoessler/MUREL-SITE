import type { Metadata } from "next";
import { ViewTransition } from "react";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { FundoVivo } from "@/components/layout/FundoVivo/FundoVivo";
import { ProgressoDeLeitura } from "@/components/layout/ProgressoDeLeitura/ProgressoDeLeitura";
import { urlSite } from "@/lib/config";
import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const titulo = "Murel: seu pátio sob controle";
const descricao =
  "O sistema de quem cuida de carro: estacionamentos, valets e lava-rápidos. Ticket 100% digital, sem impressora e sem pedir e-mail ou telefone do cliente.";

export const metadata: Metadata = {
  metadataBase: new URL(urlSite),
  title: titulo,
  description: descricao,
  openGraph: {
    title: titulo,
    description: descricao,
    url: "/",
    siteName: "Murel",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descricao,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${plusJakarta.variable} ${jetbrains.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <FundoVivo />
          <ProgressoDeLeitura />
          {/* Troca de página com transição suave: hoje só existe a home, então nada muda de visível. */}
          <ViewTransition default="auto">{children}</ViewTransition>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
