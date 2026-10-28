import type { ExternalJobValues } from "./external-job-values.js";
import type { JobReputationGate } from "./job-reputation-gate.js";

export type CreateExternalJobDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Preenchido quando a reputação ainda não libera a publicação: o diálogo mostra o bloqueio. */
  gate: JobReputationGate | null;
  pending: boolean;
  error: string | null;
  onSubmit: (values: ExternalJobValues) => void;
};
