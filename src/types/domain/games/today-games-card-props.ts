import type { TodayGameItem } from "./today-game-item.js";

export type TodayGamesCardProps = {
  games: TodayGameItem[];
  loading: boolean;
};
