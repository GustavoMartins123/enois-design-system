export type AuthMessages = {
  authHero: {
    eyebrow: string;
    quote: string;
    stats: (
      activeUsers: number,
      totalUsers: number,
      windowDays: number,
    ) => { value: string; label: string }[];
  };
};
