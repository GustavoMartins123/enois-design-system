import type { ReactNode } from "react";

import type { GameBannerFrameProps } from "./game-banner-frame-props.js";
import type { GameDetailData } from "./game-detail-data.js";
import type { GameShareRequest } from "./game-share-request.js";
import type { GameSpendPrompt } from "./game-spend-prompt.js";
import type { GameUpdateItem } from "./game-update-item.js";

export type GameDetailProps = {
  /** O jogo não foi encontrado (ou falhou ao carregar). */
  notFound: boolean;
  /** `null` enquanto o primeiro carregamento não chega. */
  game: GameDetailData | null;
  /** O @ do endereço, usado enquanto o jogo não traz o próprio. */
  username: string;
  gamesHref: string;
  developerHref: string;
  owned: boolean;
  favorited: boolean;
  favoriteDisabled: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
  onEdit: () => void;
  onNewUpdate: () => void;
  /** Desenha o banner em HTML no quadro isolado do app. */
  renderBannerFrame: (props: GameBannerFrameProps) => ReactNode;
  /** A conta mudou depois de o quadro abrir. */
  accountChanged: boolean;
  /** O player do jogo (com as pontes de identidade, gasto e compartilhamento do app). */
  player: ReactNode;
  spend: GameSpendPrompt | null;
  spendPending: boolean;
  onSpendDismiss: () => void;
  onSpendConfirm: () => void;
  achievement: GameShareRequest | null;
  achievementPending: boolean;
  onAchievementDismiss: () => void;
  onAchievementPublish: () => void;
  reviews: ReactNode;
  comments: ReactNode;
  updates: GameUpdateItem[];
  /** Diálogos do dono (edição e novidade), fora do corpo da página. */
  dialogs?: ReactNode;
};
