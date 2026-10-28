/** Um campo do formulário de candidatura que o autor da vaga montou. */
export type JobApplicationFieldData = {
  id: string;
  label: string;
  type: "TEXT" | "TEXTAREA" | "NUMBER" | "LINK";
  required: boolean;
};
