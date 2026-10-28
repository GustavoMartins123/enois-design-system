import type { SeasonalFrameArt } from "../../../../types/domain/avatar/seasonal-frame-art.js";
import { polar, round } from "../../avatar-frames.js";

import { anim, flame, flames, hat, keyed, orbit, perch, ring, ripples } from "./frame-kit.js";

/** The Curupira's backwards feet walking around, with a small fire on top. */
function curupira() {
  const feet = Array.from({ length: 10 }, (_, i) =>
    perch("pe", i * 36, 62 + (i % 2 ? 3.5 : -3.5), 1, i * 36 - 90),
  );
  const fire = [-28, -14, 0, 14, 28].map((a, i) => {
    const [x, y] = polar(46, a);
    return (
      <g key={a} transform={`translate(${x} ${y}) rotate(${a})`}>
        <path
          {...anim("flick", -i * 0.13)}
          d={flame(5, 14 + (i === 2 ? 6 : 0))}
          fill={i % 2 ? "#f97316" : "#dc2626"}
        />
      </g>
    );
  });
  return (
    <>
      <g {...anim("spin-slow")}>{keyed(feet)}</g>
      {fire}
    </>
  );
}

/** The fire snake circling the avatar: each dot is the body a little further behind. */
function boitata() {
  const body = Array.from({ length: 26 }, (_, k) => {
    const [x, y] = polar(60 + Math.sin(k * 0.8) * 2.6, -k * 8.5);
    return (
      <circle
        key={k}
        cx={x}
        cy={y}
        r={round(6.4 - k * 0.2)}
        fill={`hsl(${42 - k * 1.4} 96% ${58 - k * 0.8}%)`}
        opacity={round(1 - k / 30)}
      />
    );
  }).reverse();
  const [hx, hy] = polar(60, 4);
  return (
    <g {...anim("spin")}>
      {body}
      <g transform={`translate(${hx} ${hy}) rotate(94)`}>
        <ellipse rx={6} ry={8} fill="#f97316" />
        <circle cx={-2.6} cy={-3} r={1.7} fill="#fffbeb" />
        <circle cx={2.6} cy={-3} r={1.7} fill="#fffbeb" />
      </g>
    </g>
  );
}

function iara() {
  const scales = [];
  for (let row = 0; row < 2; row++) {
    for (let a = 112 + row * 7; a <= 248; a += 14)
      scales.push(perch("escama", a, 55 + row * 6, 1, a));
  }
  const [px, py] = polar(57, 150);
  return (
    <>
      {ripples("#06b6d4")}
      {keyed(scales)}
      <circle cx={px} cy={py} r={3.4} fill="#f0fdfa" stroke="#99f6e4" />
    </>
  );
}

export const FOLCLORE_FRAMES: Record<string, SeasonalFrameArt> = {
  "moldura-curupira": curupira,
  "moldura-boitata": boitata,
  "moldura-iara": iara,
  "moldura-mula": () => (
    <>
      {flames(28, 50, [0, 345], ["#f97316", "#ef4444", "#facc15"], 31)}
      {orbit(["ferradura"], 3, 68, 0.8, { spin: "spin-fast" })}
    </>
  ),
  "moldura-boto": () => (
    <>
      {ripples("#f9a8d4")}
      {hat("chapeu", 2.2, 6.6)}
      <g {...anim("rock")}>{perch("boto", 90, 66, 1.3, 90)}</g>
    </>
  ),
  "moldura-vitoria": () =>
    orbit(["vitoria"], 8, 61, 0.85, { spin: "", rotate: true, each: "bob", stagger: 0.3 }),
  "moldura-lobisomem": () => (
    <>
      {ring("#64748b", 1.2, "3 4")}
      {perch("luaCheia", -40, 58, 2.1)}
      {perch("garras", 130, 60, 1.9, 130)}
    </>
  ),
};
