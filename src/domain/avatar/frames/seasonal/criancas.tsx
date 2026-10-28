import type { SeasonalFrameArt } from "../../../../types/domain/avatar/seasonal-frame-art.js";

import { orbit, place, ring, risers } from "./frame-kit.js";

export const CRIANCAS_FRAMES: Record<string, SeasonalFrameArt> = {
  "moldura-pipas": () =>
    orbit(["pipa", "pipaAzul", "pipaAmarela"], 3, 64, 1, {
      spin: "spin-slow",
      rotate: false,
      each: "sway",
      stagger: 0.6,
    }),
  "moldura-piao": () => (
    <>
      {ring("#f59e0b", 1.2, "2 4")}
      {place("piao", 0, 64, 1.5, 0, "wobble")}
    </>
  ),
  "moldura-bolhas": () => risers(["bolha"], 8, 111, 0.9, [-66, 66], [40, 64]),
  "moldura-gude": () => orbit(["gude", "gudeVerde", "gudeVermelha"], 6, 60, 0.6, { spin: "spin" }),
  "moldura-figurinhas": () =>
    orbit(["figurinha"], 5, 64, 0.8, { spin: "spin-slow", each: "bob", stagger: 0.5 }),
};
