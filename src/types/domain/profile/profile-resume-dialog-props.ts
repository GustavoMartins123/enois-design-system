export type ProfileResumeDialogProps = {
  /** Currículo atual (endereço no storage) e o nome do arquivo, quando existe. */
  resumeUrl?: string | null;
  resumeName?: string | null;
  /** Envio ou gravação em andamento. */
  busy?: boolean;
  /** Recebe o PDF já conferido (tipo e tamanho) para subir e salvar. */
  onUpload: (file: File) => void;
  onRemove: () => void;
};
