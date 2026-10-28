import type { SeasonalFrameArt } from "../../../../types/domain/avatar/seasonal-frame-art.js";

import { orbit, perch, wave } from "./frame-kit.js";

export const NAMORADOS_FRAMES: Record<string, SeasonalFrameArt> = {
  "moldura-coracoes": () =>
    orbit(["coracao"], 6, 62, 0.7, { spin: "spin", each: "shine", stagger: 0.4, rotate: false }),
  "moldura-cartas": () =>
    orbit(["carta"], 3, 65, 0.8, { spin: "spin-slow", each: "bob", stagger: 0.7, rotate: false }),
  "moldura-laco": () => (
    <>
      {wave("#f472b6", { r: 56, amp: 2, freq: 9, w: 3 })}
      {perch("laco", 0, 58, 1.4)}
    </>
  ),
};
