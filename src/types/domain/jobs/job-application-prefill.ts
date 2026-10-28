/** Sugestões que o currículo trouxe para a candidatura (só sugere: a pessoa revisa e envia). */
export type JobApplicationPrefill = {
  suggestedMessage: string | null;
  fields: { fieldId: string; suggestedValue: string | null; reason: string | null }[];
  filled: number;
  total: number;
};
