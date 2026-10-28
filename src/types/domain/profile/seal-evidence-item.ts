/** Uma evidência pública validada de um selo: a issue ou o PR no GitHub. */
export type SealEvidenceItem = {
  repository: string;
  kind: "ISSUE" | "PULL_REQUEST";
  number: number;
  title: string;
  url: string;
};
