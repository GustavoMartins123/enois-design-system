import type { ProfileQuickComposerData } from "./profile-quick-composer-data.js";
import type { ProfileQuickComposerPublishPayload } from "./profile-quick-composer-publish-payload.js";

export type ProfileQuickComposerProps = {
  profile: ProfileQuickComposerData;
  publishPending?: boolean;
  uploadProgress?: string | null;
  /** Publica texto + midia; resolve `true` quando deu certo, para o campo limpar. */
  onPublish: (payload: ProfileQuickComposerPublishPayload) => Promise<boolean>;
};
