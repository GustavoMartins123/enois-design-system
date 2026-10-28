import type { AvatarFrameFxProps } from "../../../../types/domain/avatar/avatar-frame-fx-props.js";
import { useFxId } from "../use-fx-id.js";

import { SEASONAL_FRAME_ART } from "./seasonal-frame-art.js";

/** A seasonal frame drawn in the shared FX box (viewBox -80..80, avatar radius 50). */
export function SeasonalFrameFx({ frame }: AvatarFrameFxProps) {
  const id = useFxId();
  if (!Object.hasOwn(SEASONAL_FRAME_ART, frame)) return null;
  return (
    <svg viewBox="-80 -80 160 160" className="moldura-fx__svg">
      {SEASONAL_FRAME_ART[frame](id)}
    </svg>
  );
}
