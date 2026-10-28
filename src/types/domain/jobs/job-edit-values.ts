/** A vaga editada, já aparada; o app completa o PUT (o formulário de candidatura vai como está). */
export type JobEditValues = {
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  salaryMin: string;
  salaryMax: string | undefined;
  salaryPeriod: string;
  description: string;
  currency: string;
  skills: string[];
};
