export type WellbeingMessages = {
  nightRestReminder: { title: string; body: string; rest: string; keep: string };
  healthyUsageDialog: {
    title: string;
    description: string;
    switchLabel: string;
    switchHint: string;
    minutesLabel: string;
    minutesUnit: string;
    minutesHint: string;
    save: string;
    liteTitle: string;
    liteDescription: string;
    liteWhy: string;
    forceMotionTitle: string;
    forceMotionDescription: string;
    nightRestTitle: string;
    nightRestDescription: string;
    likeTitle: string;
    likeHint: string;
    dislikeTitle: string;
    dislikeHint: string;
    modulesTitle: string;
    modulesHint: string;
    /** Switchable modules: the same ids the backend validates, in display order. */
    modules: readonly { id: string; label: string; hint?: string }[];
  };
  healthyUsageReminder: {
    title: string;
    brandName: string;
    noise: string;
    body: string;
    cta: string;
  };
};
