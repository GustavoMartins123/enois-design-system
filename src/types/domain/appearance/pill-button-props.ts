import type { ReactNode } from "react";

export type PillButtonProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};
