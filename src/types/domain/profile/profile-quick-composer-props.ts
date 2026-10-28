import type { ProfileQuickComposerData } from "./profile-quick-composer-data.js";

export type ProfileQuickComposerPublishPayload = {
  content: string;
  files: File[];
  mediaSpoiler: boolean;
};

export type ProfileQuickComposerProps = {
  profile: ProfileQuickComposerData;
  publishPending?: boolean;
  uploadProgress?: string | null;
  /** Publica texto + midia; resolve `true` quando deu certo, para o campo limpar. */
  onPublish: (payload: ProfileQuickComposerPublishPayload) => Promise<boolean>;
};
