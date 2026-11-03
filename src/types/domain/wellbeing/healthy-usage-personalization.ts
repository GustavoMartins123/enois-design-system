/** The personalization saved on the account (the backend is the source of truth). */
export type HealthyUsagePersonalization = {
  likedTopics: string[];
  blockedTopics: string[];
  disabledModules: string[];
  nightRestReminder: boolean;
  liteMode: boolean;
  /** Modo BATATA (interface econômica); independente do lite, e o app soma os efeitos. */
  batataMode: boolean;
};
