import type { ProjectFormData } from "./project-form-data.js";
import type { ProjectFormValues } from "./project-form-values.js";

export type ProjectFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Projeto em edição; ausente para enviar um novo. */
  project?: ProjectFormData | null;
  savePending?: boolean;
  onSave: (values: ProjectFormValues) => void;
};
