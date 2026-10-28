import type { ReactNode } from "react";

export type ContributorsSectionProps = {
  loading: boolean;
  error: boolean;
  /** A refetch is running: the refresh icon spins. */
  fetching?: boolean;
  empty: boolean;
  onRefresh: () => void;
  /** The application cards (`ContributorCard`), rendered inside the list. */
  children?: ReactNode;
};
