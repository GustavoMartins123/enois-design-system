import type { ProfileQuickComposerData } from "./profile-quick-composer-data.js";

export type ProfileQuickComposerProps = {
  profile: ProfileQuickComposerData;
  publishPending?: boolean;
  /** Publica o texto (já aparado); resolve `true` quando deu certo, para o campo limpar. */
  onPublish: (content: string) => Promise<boolean>;
};
