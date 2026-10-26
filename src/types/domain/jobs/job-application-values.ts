/** O que a pessoa preencheu na candidatura, sem tratamento: o app apara e monta o envio. */
export type JobApplicationValues = {
  message: string;
  /** Respostas por id do campo. */
  values: Record<string, string>;
};
