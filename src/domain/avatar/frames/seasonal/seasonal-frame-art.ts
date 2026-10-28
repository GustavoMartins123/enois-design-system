import type { SeasonalFrameArt } from "../../../../types/domain/avatar/seasonal-frame-art.js";

import { CARNAVAL_FRAMES } from "./carnaval.js";
import { CRIANCAS_FRAMES } from "./criancas.js";
import { DEV_FRAMES } from "./dev.js";
import { FLOR_FRAMES } from "./flor.js";
import { FOLCLORE_FRAMES } from "./folclore.js";
import { HALLOWEEN_FRAMES } from "./halloween.js";
import { JUNINA_FRAMES } from "./junina.js";
import { NAMORADOS_FRAMES } from "./namorados.js";
import { NATAL_FRAMES } from "./natal.js";
import { REVEILLON_FRAMES } from "./reveillon.js";
import { SACI_FRAMES } from "./saci.js";

/** Every seasonal frame drawing, keyed by catalog id (the ids are listed in FX_FRAMES). */
export const SEASONAL_FRAME_ART: Readonly<Record<string, SeasonalFrameArt>> = {
  ...SACI_FRAMES,
  ...HALLOWEEN_FRAMES,
  ...FOLCLORE_FRAMES,
  ...NATAL_FRAMES,
  ...REVEILLON_FRAMES,
  ...CARNAVAL_FRAMES,
  ...JUNINA_FRAMES,
  ...NAMORADOS_FRAMES,
  ...FLOR_FRAMES,
  ...DEV_FRAMES,
  ...CRIANCAS_FRAMES,
};
