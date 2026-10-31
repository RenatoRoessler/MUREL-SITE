const urlBase = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export const urlAcesso = urlBase;

export const urlAdesao = `${urlBase}/adesao`;

export const emailContato = "contato@murel.com.br";

export const urlSite = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export const numeroWhatsapp = "5519992215384";

export const numeroWhatsappExibicao = "(19) 99221-5384";

export const rotuloWhatsapp = "Estamos online!";

export const mensagemWhatsapp = "Olá! Vim pelo site da Murel e quero conhecer o sistema.";

export const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagemWhatsapp)}`;
