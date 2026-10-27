import type { ReactNode } from "react";

import type { LinkedinImportPreview } from "./linkedin-import-preview.js";

export type LinkedinImportSectionProps = {
  linkedinConnected?: boolean;
  /** Retrato à espera de revisão; `null` mostra as formas de importar. */
  preview: LinkedinImportPreview | null;
  /** Marcados por chave (`perfil`, `skills`, `exp0`, `edu0`, `cert0`, `proj0`...). */
  selected: Record<string, boolean>;
  onToggle: (key: string) => void;
  /** Caixa de colar o perfil aberta. */
  pasteOpen: boolean;
  onPasteOpenChange: (open: boolean) => void;
  /** O ZIP já passou pelo teto de tamanho. */
  onImportArchive: (file: File) => void;
  archivePending?: boolean;
  onImportText: (text: string) => void;
  textPending?: boolean;
  /** O currículo já passou pelo formato e pelo teto de tamanho. */
  onImportResume: (file: File) => void;
  resumePending?: boolean;
  onSave: () => void;
  savePending?: boolean;
  onCancelPreview: () => void;
  /** Contatos e convite automático; o app só passa com o LinkedIn vinculado. */
  contactsSection?: ReactNode;
};
