/** "Conta e segurança" page: the account items that used to crowd the account menu. */
export type AccountSettingsProps = {
  hrefs: {
    security: string;
    blockedUsers: string;
    myReports: string;
    sanctions: string;
  };
  onChangeEmail: () => void;
  onChangePassword: () => void;
  onOpenLinkedAccounts: () => void;
  onDeleteAccount: () => void;
};
