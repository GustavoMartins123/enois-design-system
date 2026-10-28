import type { SeasonalFrameArt } from "../../../../types/domain/avatar/seasonal-frame-art.js";

import { anim, orbit, perch, place, ring, risers, wings } from "./frame-kit.js";

const BAT_WING = (
  <>
    <path
      d="M0 -2 C-14 -24 -30 -42 -44 -46 C-40 -34 -40 -26 -42 -18 C-34 -22 -28 -20 -24 -14 C-22 -20 -16 -20 -12 -14 C-12 -10 -6 -6 0 2Z"
      fill="#1e1b4b"
      stroke="#a78bfa"
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
    <path
      d="M-4 -4 C-14 -20 -26 -34 -38 -40"
      stroke="#a78bfa"
      strokeWidth={0.7}
      fill="none"
      opacity={0.7}
    />
  </>
);

const HORN = (
  <path
    d="M0 0 C-3 -8 0 -16 7 -21 C5 -13 8 -7 9 0Z"
    fill="#dc2626"
    stroke="#7f1d1d"
    strokeWidth={1}
  />
);

export const HALLOWEEN_FRAMES: Record<string, SeasonalFrameArt> = {
  "moldura-asas-morcego": () => wings(BAT_WING),
  "moldura-chifres": () => (
    <>
      <g transform="translate(-24 -42) rotate(-15)">{HORN}</g>

      <g transform="translate(24 -42) scale(-1 1) rotate(-15)">{HORN}</g>
    </>
  ),
  "moldura-abobora": () => (
    <>
      {ring("#7c3aed", 1.6, "1 4")}
      {orbit(["morcego"], 3, 67, 1, { each: "flap", stagger: 0.17 })}
      {perch("abobora", 140, 56, 1.4, -12)}
    </>
  ),
  "moldura-teia": () => (
    <>
      {perch("teia", 45, 62, 2.3)}
      <g {...anim("bob")}>
        <path d="M66 -36 V2" stroke="#94a3b8" strokeWidth={0.7} />
        {place("aranha", 66, 6, 0.9)}
      </g>
    </>
  ),
  "moldura-fantasmas": () =>
    orbit(["fantasma"], 3, 64, 1, { spin: "spin-slow", rotate: false, each: "bob", stagger: 0.6 }),
  "moldura-caldeirao": () => (
    <>
      {perch("caldeirao", 220, 60, 1.6)}
      {risers(["bolhaVerde"], 6, 21, 0.9, [-62, -30], [30, 44])}
    </>
  ),
  "moldura-lua": () => (
    <>
      {perch("luaCheia", 40, 56, 2.6)}
      {orbit(["morcego"], 2, 68, 0.9, { spin: "spin-slow", each: "flap" })}
    </>
  ),
  "moldura-velas": () =>
    orbit(["vela"], 7, 60, 0.95, {
      spin: "",
      arc: [115, 245],
      rotate: false,
      each: "blink",
      stagger: 0.4,
    }),
};
