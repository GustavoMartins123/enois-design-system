export type E2eSetupBannerProps = {
  /** Accounts with a password unlock with it; OAuth-only accounts define one first. */
  hasPassword: boolean;
  /** Restores or generates the key pair; resolves `false` on failure (the form shows the error). */
  onSetupWithPassword: (password: string) => Promise<boolean>;
  /** Defines the account password and generates the key pair; resolves `false` on failure. */
  onDefinePassword: (newPassword: string) => Promise<boolean>;
};
