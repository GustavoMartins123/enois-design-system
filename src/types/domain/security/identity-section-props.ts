import type { IdentityData } from "./identity-data.js";
import type { IdentityValues } from "./identity-values.js";

export type IdentitySectionProps = {
  /** Os valores da conta; trocar o objeto re-semeia os campos. */
  identity?: IdentityData;
  onSave: (values: IdentityValues) => void;
  savePending?: boolean;
  /** Endereços dos emblemas, na ordem do perfil. */
  badges: string[];
  onAddBadge: (file: File) => void;
  onRemoveBadge: (url: string) => void;
  /** Lista de emblemas sendo salva. */
  badgesPending?: boolean;
  /** Imagem de um emblema subindo. */
  uploading?: boolean;
};
