import type { ComponentPropsWithoutRef } from "react";

export type ErrorBannerProps = Pick<ComponentPropsWithoutRef<"div">, "className"> & {
  message: string;
  /** Technical details listed (and copied) under the message. */
  details: string[];
  /** Known-error suggestion shown with the details. */
  hint?: string;
  /** Mantém detalhes técnicos fora de fluxos voltados ao usuário final, como login. */
  showDetails?: boolean;
};
