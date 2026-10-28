import { AlertTriangle, CircleCheck } from "lucide-react";

import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { ContrastNoticeProps } from "../../types/domain/appearance/contrast-notice-props.js";
import type { ThemeContrastLevel } from "../../types/lib/theme/theme-contrast-level.js";

const TONE: Record<ThemeContrastLevel, string> = {
  AAA: "text-growth",
  AA: "text-growth",
  AA_LARGE: "text-opportunity",
  FAIL: "text-destructive",
};

/**
 * Mede o pior par de cores do tema e diz, em português claro, se dá para ler.
 *
 * É o que impede a personalização livre de terminar em texto ilegível: o usuário
 * vê o problema na hora, com a dica de como resolver.
 */
export function ContrastNotice({ report }: ContrastNoticeProps) {
  const messages = useMessages().contrastNotice;
  const healthy = report.level === "AAA" || report.level === "AA";
  const Icon = healthy ? CircleCheck : AlertTriangle;

  return (
    <div className="flex items-start gap-2 rounded-xl bg-surface-2 px-3 py-2">
      <Icon className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", TONE[report.level])} />

      <div className="min-w-0 space-y-0.5">
        <p className={cn("text-xs font-medium", TONE[report.level])}>
          {messages.label}: {messages[report.level]} ({report.ratio}:1)
        </p>

        <p className="text-xs font-normal text-text-subtle">
          {messages.worstPair(report.worstPair)}
        </p>

        {!healthy && <p className="text-xs font-normal text-text-subtle">{messages.hint}</p>}
      </div>
    </div>
  );
}
