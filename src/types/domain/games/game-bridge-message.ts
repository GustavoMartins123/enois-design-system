import type { GameShareRequest } from "./game-share-request.js";
import type { GameSpendRequest } from "./game-spend-request.js";

export type GameBridgeMessage =
  | { type: "enois:identity" }
  | ({ type: "enois:share" } & GameShareRequest)
  | ({ type: "enois:spend" } & GameSpendRequest)
  | { type: "enois:loading"; progress: number | null }
  | { type: "enois:ready" }
  | { type: "enois:error"; message: string | null };
