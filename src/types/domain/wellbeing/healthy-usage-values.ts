/** Everything the dialog saves: the app writes the device part locally and the rest to the API. */
export type HealthyUsageValues = {
  enabled: boolean;
  minutes: number;
  liked: string[];
  blocked: string[];
  disabledModules: string[];
  nightRestReminder: boolean;
  liteMode: boolean;
  /**
   * BATATA: interface clássica e econômica. A apresentação trata BATATA como lite ligado, então
   * as duas chaves são independentes aqui — o app é quem soma os efeitos.
   */
  batataMode: boolean;
  forceMotion: boolean;
  /** 3D tilt and sheen of the profile card; a device choice, on by default. */
  cardTilt: boolean;
};
