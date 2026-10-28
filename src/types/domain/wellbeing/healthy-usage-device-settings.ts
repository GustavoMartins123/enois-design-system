/** What this device keeps locally, read each time the dialog opens. */
export type HealthyUsageDeviceSettings = {
  /** Break reminder on/off. */
  enabled: boolean;
  minutes: number;
  forceMotion: boolean;
  /** The system asks for reduced motion: only then the "keep animations" switch shows up. */
  reducedMotion: boolean;
};
