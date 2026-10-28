export type ProfileEffectProps = {
  /** Profile effect id (`efeito-*`); unknown ids render nothing. */
  effect: string | null | undefined;
  /** Change it to play the effect again (it plays once on mount). */
  replayKey?: number | string;
  className?: string;
};
