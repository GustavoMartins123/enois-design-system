import { Flame } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { TodayGamesCardProps } from "../../types/domain/games/today-games-card-props.js";
import { AppLink } from "../../ui/app-link.js";
import { Skeleton } from "../../ui/skeleton.js";

import { GameIcon } from "./game-icon.js";

/**
 * "Jogados hoje" no painel lateral do feed: as últimas 24 horas de partidas iniciadas, contadas
 * pelo servidor (`POST /games/{id}/play`), não pelo front.
 *
 * É prova social, não recomendação — não personaliza e não some para quem não tem sessão. O número
 * que aparece é de pessoas distintas, porque "10 sessões" lido como "10 pessoas" é o tipo de número
 * que infla card sem inflar nada de verdade.
 *
 * Sem jogo nenhum na janela o card não abre: painel lateral com seção vazia é anúncio de que a
 * comunidade está parada.
 */
export function TodayGamesCard({ games, loading }: TodayGamesCardProps) {
  const messages = useMessages().todayGamesCard;

  if (!loading && games.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border-soft bg-surface-card p-4">
      <h2 className="flex items-center gap-1.5 text-sm font-medium text-text-strong">
        <Flame className="h-4 w-4 text-primary" aria-hidden />

        <>{messages.title}</>
      </h2>

      <p className="mt-0.5 text-xs text-text-subtle">{messages.subtitle}</p>

      <ul className="mt-3 space-y-1">
        {loading
          ? [0, 1, 2].map((row) => (
              <li key={row} className="flex items-center gap-2.5 px-2 py-1.5">
                <Skeleton className="h-9 w-9 shrink-0 rounded-xl" />

                <span className="min-w-0 flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </span>
              </li>
            ))
          : games.map((game) => (
              <li key={game.id}>
                <AppLink
                  href={game.href}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-muted/50"
                >
                  <GameIcon
                    cover={game.cover}
                    icon={game.icon}
                    url={game.url}
                    className="h-9 w-9"
                  />

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-normal text-text-strong">
                      {game.title}
                    </span>

                    <span className="block truncate text-xs text-text-subtle">
                      {messages.players(game.players)}
                    </span>
                  </span>
                </AppLink>
              </li>
            ))}
      </ul>
    </div>
  );
}
