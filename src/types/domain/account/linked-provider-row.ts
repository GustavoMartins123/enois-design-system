/** Um provedor de login na lista de contas vinculadas. */
export type LinkedProviderRow = {
  provider: string;
  label: string;
  /** Vínculo existente; `null` quando o provedor ainda não está ligado à conta. */
  current: { email?: string | null } | null;
  /** Dá para vincular (provedor habilitado). */
  linkable: boolean;
};
