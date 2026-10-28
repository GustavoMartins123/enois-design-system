/** One particle of a profile effect run: what it draws and how the Web Animations API moves it. */
export type ProfileEffectParticle = {
  /** Cosmetic icon key; absent for the plain dots of the snake. */
  icon?: string;
  color?: string;
  size: number;
  keyframes: Keyframe[];
  options: KeyframeAnimationOptions;
};
