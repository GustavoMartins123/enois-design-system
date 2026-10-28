/** Recusa do salvar: erro do campo username ou erro geral do diálogo. */
export type EditProfileSaveError = { field: "username" | "general"; message: string };
