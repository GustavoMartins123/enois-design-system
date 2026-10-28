import type { ReactNode } from "react";

export type NameplateProps = {
  /** Nameplate item id (`placa-*`); without a known plate the name renders plain. */
  plate?: string | null;
  /** The name, usually a StyledName. */
  children: ReactNode;
  /** Badges after the name. */
  badges?: ReactNode;
  className?: string;
};
