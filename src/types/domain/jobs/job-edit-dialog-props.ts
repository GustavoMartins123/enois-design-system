import type { JobEditData } from "./job-edit-data.js";
import type { JobEditOptions } from "./job-edit-options.js";
import type { JobEditValues } from "./job-edit-values.js";

export type JobEditDialogProps = {
  /** Vaga a editar; `null` fecha o diálogo. */
  job: JobEditData | null;
  onOpenChange: (open: boolean) => void;
  options: JobEditOptions;
  saving: boolean;
  error: string | null;
  onSave: (values: JobEditValues) => void;
};
