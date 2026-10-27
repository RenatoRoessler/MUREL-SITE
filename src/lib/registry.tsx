"use client";

import { useState, type ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from "styled-components";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { theme } from "@/styles/theme";

function Themed({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default function StyledComponentsRegistry({
  children,
}: {
  children: ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <Themed>{children}</Themed>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <Themed>{children}</Themed>
    </StyleSheetManager>
  );
}
