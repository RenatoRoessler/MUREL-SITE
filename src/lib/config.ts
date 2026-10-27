const urlBase = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export const urlAcesso = urlBase;

export const emailContato = "contato@murel.com.br";

export const urlSite = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
