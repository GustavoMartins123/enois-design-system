import type { EditProfileSubListDraft } from "../../types/domain/profile/edit-profile-sub-list-draft.js";
import type { ProfileMessages } from "../../types/messages/profile-messages.js";

/**
 * Erros que impedem salvar um item da sub-lista, por chave do campo (vazio = pode salvar).
 *
 * Sem esta checagem o formulário fechava como salvo e gravava outra coisa: uma data impossível
 * (31/11) deixa o `value` do campo de data em "", e o backend deriva "atualmente aqui" de
 * `endDate == null` — a experiência que a pessoa acabou de encerrar voltava como atual.
 */
export function subListErrors(
  { fields, form, invalidDates, currentlyHere }: EditProfileSubListDraft,
  messages: Pick<
    ProfileMessages["editProfileDialog"],
    "requiredField" | "invalidDate" | "endDateRequired"
  >,
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    if (invalidDates.has(field.key)) {
      errors[field.key] = messages.invalidDate;
    } else if (field.required && !form[field.key]?.trim()) {
      errors[field.key] = messages.requiredField;
    }
  }
  // O backend não recebe "atualmente aqui": encerrar uma experiência é informar quando terminou.
  if (currentlyHere === false && !errors.endDate && !form.endDate) {
    errors.endDate = messages.endDateRequired;
  }
  return errors;
}
