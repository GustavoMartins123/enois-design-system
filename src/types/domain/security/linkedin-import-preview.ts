/** O retrato importado (LinkedIn ou currículo), com os campos que a revisão mostra. */
export type LinkedinImportPreview = {
  experiences: { title: string | null; company: string | null }[];
  education: { school: string; degree: string | null; field: string | null }[];
  certifications: { name: string }[];
  projects: { title: string }[];
  profile: { headline: string | null; summary: string | null; location: string | null } | null;
  skills: string[];
  /** O que veio no arquivo mas não tem estrutura no Énóis (idiomas, prêmios, cursos…). */
  semEstrutura: Record<string, number>;
  found: number;
};
