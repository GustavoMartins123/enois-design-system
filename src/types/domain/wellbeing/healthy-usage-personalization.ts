/** The personalization saved on the account (the backend is the source of truth). */
export type HealthyUsagePersonalization = {
  likedTopics: string[];
  blockedTopics: string[];
  disabledModules: string[];
  nightRestReminder: boolean;
  liteMode: boolean;
};
