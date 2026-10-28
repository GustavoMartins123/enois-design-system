import type { EditProfileSubField } from "./edit-profile-sub-field.js";

/** O formulário de uma sub-lista do perfil (experiência, formação, certificação) na hora de salvar. */
export type EditProfileSubListDraft = {
  fields: EditProfileSubField[];
  form: Record<string, string>;
  /** Campos de data que o navegador recusou: data incompleta ou impossível (31/11). */
  invalidDates: ReadonlySet<string>;
  /** Ausente quando a lista não tem "Atualmente aqui". */
  currentlyHere?: boolean;
};
