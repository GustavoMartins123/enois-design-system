import type { ComponentPropsWithoutRef } from "react";

import type { MentionUser } from "./mention-user.js";

export type MentionTextareaProps = Pick<
  ComponentPropsWithoutRef<"textarea">,
  "placeholder" | "className" | "maxLength" | "rows"
> & {
  value: string;
  onChange: (value: string, mentionedUserIds: string[]) => void;
  /** Mostra a barra de formatacao (negrito, lista, citacao...) acima do campo. */
  toolbar?: boolean;
  /** Imagens coladas no campo (Ctrl+V): o dono do campo decide subir e anexar. */
  onPasteImages?: (files: File[]) => void;
  /** Users matching the current @mention term (the app searches from two characters on). */
  mentionResults: MentionUser[];
  /** The @mention term being typed ("" when there is none). */
  onMentionQueryChange: (query: string) => void;
};
