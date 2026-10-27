import "styled-components";
import type { AppTheme } from "./theme";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- augmentação de módulo exige interface vazia que estende o tema
  export interface DefaultTheme extends AppTheme {}
}
