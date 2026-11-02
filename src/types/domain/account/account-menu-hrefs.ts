export type AccountMenuHrefs = {
  profile: string;
  corporateProfile: string;
  wallet: string;
  marketplace: string;
  support: string;
  /**
   * "Conta e segurança" page. When set, the menu shows one entry for it and the account items
   * below (and the matching callbacks) can be left out, which keeps the menu short.
   */
  account?: string;
  security?: string;
  blockedUsers?: string;
  myReports?: string;
  sanctions?: string;
  guardian: string;
  moderator: string;
  apoie: string;
  /** Notification preferences page; the menu item only shows when it is set. */
  notificationPreferences?: string;
};
