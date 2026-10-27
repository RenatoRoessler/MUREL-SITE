// Tokens do guia de marca (docs/Marca_Murel.html). Tema único e escuro.
export const theme = {
  colors: {
    asfalto: "#0E1729",
    asfalto2: "#16223A",
    asfalto3: "#22304B",
    faixaCinza: "#3A4C6B",
    bordaControle: "#6B80A4",
    amarelo: "#FFC20E",
    amareloEscuro: "#E0A800",
    giz: "#F4F1E8",
    nevoa: "#9AA3B5",
    ok: "#3CCB7F",
    alerta: "#FF5A5F",
  },
  fontFamilies: {
    sans: "var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif",
    mono: "var(--font-jetbrains), ui-monospace, Menlo, monospace",
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  space: [0, 4, 8, 16, 24, 32, 48, 64],
  radii: {
    sm: "6px",
    md: "10px",
    lg: "14px",
    xl: "18px",
    full: "9999px",
  },
  layout: {
    contentMaxWidth: "1120px",
    headerHeight: "72px",
  },
  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
  },
} as const;

export type AppTheme = typeof theme;
