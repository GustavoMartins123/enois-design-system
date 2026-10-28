import type { ReportSubmission } from "./report-submission.js";
import type { ReportTargetType } from "./report-target-type.js";

/**
 * Denúncia de qualquer alvo (post, comentário, perfil, vaga, grupo). O formulário é um só — o que
 * muda é o tipo do alvo (e o título). Quem abre manda no `open`.
 */
export type ReportDialogProps<T extends string = string> = {
  targetType: ReportTargetType;
  /** Motivos aceitos pelo backend, na ordem do seletor. */
  reasons: readonly T[];
  defaultReason: T;
  /** Diretrizes da comunidade (abre em outra aba). */
  guidelinesHref: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sending?: boolean;
  /** Envia a denúncia; `true` quando deu certo (a descrição é limpa). */
  onSubmit: (report: ReportSubmission<T>) => Promise<boolean>;
};
