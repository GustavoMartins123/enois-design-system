/** Os campos da vaga que o diálogo de edição lê. */
export type JobEditData = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  salaryMin?: string | null;
  salaryMax?: string | null;
  salaryPeriod?: string | null;
  currency: string | null;
  skills: string[];
  description?: string | null;
};
