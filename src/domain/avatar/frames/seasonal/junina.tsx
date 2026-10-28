import type { SeasonalFrameArt } from "../../../../types/domain/avatar/seasonal-frame-art.js";
import { polar } from "../../avatar-frames.js";

import { anim, arc, bursts, flames, hat, keyed, orbit, place, ring } from "./frame-kit.js";

const FLAG_COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#a855f7", "#ec4899"];

/** A string of party flags over the head and the bonfire below. */
function bandeirinhas() {
  const flags = [];
  for (let a = -78, i = 0; a <= 78; a += 13, i++) {
    const [x, y] = polar(60, a);
    flags.push(
      <g transform={`translate(${x} ${y}) rotate(${a})`}>
        <g {...anim("sway", -i * 0.35)}>
          <path d="M-5 0 H5 V-11 L0 -7.5 L-5 -11 Z" fill={FLAG_COLORS[i % 6]} />
        </g>
      </g>,
    );
  }
  return (
    <>
      <path d={arc(60, -84, 84)} fill="none" stroke="#a16207" strokeWidth={1} />
      {keyed(flags)}
      {place("fogueira", 0, 64, 1.3)}
    </>
  );
}

export const JUNINA_FRAMES: Record<string, SeasonalFrameArt> = {
  "moldura-bandeirinhas": bandeirinhas,
  "moldura-fogueira": () => (
    <>
      {flames(14, 50, [110, 250], ["#f97316", "#facc15", "#ef4444"], 17)}
      {place("fogueira", 0, 66, 1.2)}
    </>
  ),
  "moldura-chapeu-palha": () => (
    <>
      {ring("#eab308", 1.4, "4 3")}
      {hat("chapeuPalha", 2.6, 6)}
    </>
  ),
  "moldura-milharal": () =>
    orbit(["milho"], 12, 60, 0.75, { spin: "", each: "sway", stagger: 0.2 }),
  "moldura-chita": () =>
    orbit(["florRosa", "florAzul", "florAmarela"], 12, 58, 0.65, { spin: "spin-slow" }),
  "moldura-estrelinha": () => bursts(["estrelinha"], 7, 71, 1, [90, 270]),
};
