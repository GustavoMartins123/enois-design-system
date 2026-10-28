import type { ReactNode } from "react";

import type { GithubReadmePreview } from "./github-readme-preview.js";
import type { GithubRepoRow } from "./github-repo-row.js";
import type { ProfileHtmlFrameProps } from "./profile-html-frame-props.js";

export type GithubImportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Sem GitHub vinculado: o diálogo só aponta para a página de segurança. */
  notLinked: boolean;
  securityHref: string;
  repos: { loading: boolean; error: boolean; rows: GithubRepoRow[] };
  /** `fullName` dos repositórios marcados; o app guarda e limpa depois de importar. */
  selected: string[];
  onToggle: (fullName: string) => void;
  onSelectAll: () => void;
  onClear: () => void;
  importing: boolean;
  onImport: () => void;
  /** `missing`: o perfil do GitHub não tem README público. */
  readme: {
    loading: boolean;
    missing: boolean;
    data: GithubReadmePreview | null;
    error: boolean;
  };
  usingReadme: boolean;
  onUseReadme: () => void;
  renderHtmlFrame: (props: ProfileHtmlFrameProps) => ReactNode;
};
