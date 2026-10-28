import type { CompanyMemberCandidate } from "./company-member-candidate.js";

export type CompanyTeamSectionProps = {
  members: { userId: string; role: string }[];
  search: string;
  onSearchChange: (search: string) => void;
  /** Resultados da busca (o app só busca com 2+ letras). */
  results: CompanyMemberCandidate[];
  selected: CompanyMemberCandidate | null;
  onSelectedChange: (selected: CompanyMemberCandidate | null) => void;
  role: string;
  onRoleChange: (role: string) => void;
  addPending: boolean;
  onAdd: () => void;
};
