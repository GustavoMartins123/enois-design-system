import type { ReactNode } from "react";

import type { CompanyEditData } from "./company-edit-data.js";
import type { CompanyEditValues } from "./company-edit-values.js";
import type { CompanyImageKind } from "./company-image-kind.js";

export type CompanyEditDialogProps = {
  company: CompanyEditData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  savePending: boolean;
  /** Alguma imagem ainda subindo: salvar espera. */
  uploading: boolean;
  onSave: (values: CompanyEditValues) => void;
  /** Sobe a imagem e devolve o endereço salvo; `null` quando falhou (o app já avisou). */
  onUploadImage: (kind: CompanyImageKind, file: File) => Promise<string | null>;
  /** A equipe (só para OWNER/ADMIN), no fim do painel. */
  teamSection?: ReactNode;
};
