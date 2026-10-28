import type { ReactNode } from "react";

import type { GameIdentityGrant } from "./game-identity-grant.js";
import type { GameShareRequest } from "./game-share-request.js";
import type { GameSpendRequest } from "./game-spend-request.js";

export type GamePlayerProps = {
  url: string;
  title: string;
  aspect?: string | null;
  playable?: boolean;
  autoStart?: boolean;
  tallOnMobile?: boolean;
  /** Sem `identity` o player não responde pedidos de identidade (ex.: moderação). */
  identity?: GameIdentityGrant | null;
  stats?: ReactNode;
  onStart?: (retry: boolean, session: number) => void;
  onShareRequest?: (request: GameShareRequest, session: number) => void;
  onSpendRequest?: (request: GameSpendRequest, session: number) => void;
};
