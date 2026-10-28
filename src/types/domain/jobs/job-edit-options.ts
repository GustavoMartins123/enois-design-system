import type { JobCurrencyOption } from "./job-currency-option.js";
import type { JobOption } from "./job-option.js";

/** Os catálogos da vaga (vêm do app, que manda os códigos para a API). */
export type JobEditOptions = {
  locations: readonly string[];
  types: readonly JobOption[];
  levels: readonly JobOption[];
  salaryPeriods: readonly JobOption[];
  /** A primeira é a padrão (e a do símbolo quando a moeda da vaga é desconhecida). */
  currencies: readonly JobCurrencyOption[];
};
