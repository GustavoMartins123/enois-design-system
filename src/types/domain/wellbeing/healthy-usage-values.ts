/** Everything the dialog saves: the app writes the device part locally and the rest to the API. */
export type HealthyUsageValues = {
  enabled: boolean;
  minutes: number;
  liked: string[];
  blocked: string[];
  disabledModules: string[];
  nightRestReminder: boolean;
  liteMode: boolean;
  forceMotion: boolean;
};
