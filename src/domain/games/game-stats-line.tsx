import { useMessages } from "../../messages/messages-context.js";
import type { GameStatsLineProps } from "../../types/domain/games/game-stats-line-props.js";

export function GameStatsLine({ plays, players, favorites }: GameStatsLineProps) {
  const t = useMessages().gameStatsLine;

  return (
    <p title={t.statsHint}>
      {t.plays(plays)}
      {players !== null && ` · ${t.players(players)}`}
      {favorites > 0 && ` · ${t.favorites(favorites)}`}
    </p>
  );
}
