/** A vaga externa cadastrada, já aparada (opcionais vazios saem como `undefined`). */
export type ExternalJobValues = {
  title: string;
  company: string;
  location?: string;
  url: string;
  description?: string;
  salaryMin?: string;
  salaryMax?: string;
  salaryPeriod: "HOUR" | "DAY" | "MONTH" | "YEAR";
  salaryNotInformed: boolean;
  applyEmail?: string;
  communityAgreement: boolean;
};
