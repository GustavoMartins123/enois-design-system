import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { GameAnalyticsCardProps } from "../../types/domain/games/game-analytics-card-props.js";

const WINDOWS = [7, 30, 90] as const;

/**
 * Os números de uso do jogo, só para o criador: totais (sessões, pessoas distintas, biblioteca e
 * novidades) e a série diária em barras. O gráfico é feito com divs — sem biblioteca nova por um
 * gráfico de barras, e o tema já pinta as barras.
 *
 * A série sempre cobre a janela inteira (dia sem evento aparece com zero) — o eixo não muda de
 * tamanho conforme o uso, senão dois dias parados pareciam dois dias ruins.
 */
export function GameAnalyticsCard({
  days,
  onDaysChange,
  data,
  loading,
  error,
}: GameAnalyticsCardProps) {
  const messages = useMessages().gameAnalyticsCard;
  const max = Math.max(1, ...(data?.series ?? []).map((day) => day.pageViews));
  const totalViews = (data?.series ?? []).reduce((sum, day) => sum + day.pageViews, 0);

  return (
    <div className="rounded-xl border border-border-soft p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-text-strong">{messages.title}</h3>

        <div className="flex gap-1">
          {WINDOWS.map((window) => (
            <button
              key={window}
              type="button"
              onClick={() => onDaysChange(window)}
              className={cn(
                "rounded-full px-2 py-0.5 text-xs transition",
                days === window
                  ? "bg-primary-soft font-medium text-primary"
                  : "text-text-subtle hover:bg-muted",
              )}
            >
              {window}d
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="mt-2 text-xs text-text-subtle">{messages.loading}</p>
      ) : error ? (
        <p className="mt-2 text-xs text-destructive">{messages.error}</p>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label={messages.plays} value={data?.plays ?? 0} />
            <Stat label={messages.players} value={data?.players ?? 0} />
            <Stat label={messages.favorites} value={data?.favorites ?? 0} />
            <Stat label={messages.updates} value={data?.updates ?? 0} />
          </div>

          <div className="mt-3">
            <p className="text-xs text-text-subtle">{messages.views(totalViews, days)}</p>

            <div
              className="mt-1 flex h-20 items-end gap-[2px]"
              role="img"
              aria-label={messages.chartLabel(days)}
            >
              {(data?.series ?? []).map((day) => (
                <div
                  key={day.date}
                  // Dia sem visualização fica com 2px de base: sem isso a barra desaparece e o
                  // eixo parece ter buracos.
                  style={{ height: `${Math.max(2, (day.pageViews / max) * 100)}%` }}
                  className="flex-1 rounded-t bg-primary/60"
                  title={messages.tooltip(day.date, day.pageViews, day.plays, day.players)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-muted px-2 py-1.5">
      <p className="text-xs text-text-subtle">{label}</p>

      <p className="text-sm font-semibold text-text-strong">{value.toLocaleString("pt-BR")}</p>
    </div>
  );
}
