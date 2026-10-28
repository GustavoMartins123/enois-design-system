import { useMessages } from "../../../messages/messages-context.js";
import type { DailyRankingProps } from "../../../types/domain/games/daily-ranking-props.js";
import { AppLink } from "../../../ui/app-link.js";

/** "Ranking de hoje" dos jogos diários. */
export function DailyRanking({
  titleClassName,
  loading,
  error,
  onRetry,
  entries,
}: DailyRankingProps) {
  const messages = useMessages().dailyRanking;

  return (
    <>
      <h3 className={titleClassName}>{messages.title}</h3>
      {loading && (
        <p className="mt-2 text-sm" role="status">
          {messages.loading}
        </p>
      )}
      {error && (
        <p className="mt-2 text-sm" role="alert">
          {messages.error}{" "}
          <button className="text-primary underline" onClick={onRetry}>
            {messages.retry}
          </button>
        </p>
      )}
      {entries &&
        (entries.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">{messages.empty}</p>
        ) : (
          <ol className="mt-2 divide-y divide-border">
            {entries.map((item, index) => (
              <li key={item.username} className="flex justify-between gap-2 py-2 text-sm">
                <span>
                  {index + 1}.{" "}
                  <AppLink href={item.href} className="text-primary underline">
                    {item.name}
                  </AppLink>
                </span>

                <span>{item.detail}</span>
              </li>
            ))}
          </ol>
        ))}
    </>
  );
}
