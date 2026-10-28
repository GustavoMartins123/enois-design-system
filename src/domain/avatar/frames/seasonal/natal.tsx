import type { SeasonalFrameArt } from "../../../../types/domain/avatar/seasonal-frame-art.js";
import { polar } from "../../avatar-frames.js";

import { fallers, hat, lights, orbit, perch, place, ring, sun } from "./frame-kit.js";

export const NATAL_FRAMES: Record<string, SeasonalFrameArt> = {
  "moldura-pisca": () => lights(16, ["#ef4444", "#facc15", "#22c55e", "#3b82f6"]),
  "moldura-neve": () => (
    <>
      {ring("#7dd3fc", 1.5, "2 5", 53.5)}
      {fallers(["floco"], 10, 35, 0.45)}
      {sun(60, 42)}
    </>
  ),
  "moldura-guirlanda": () => (
    <>
      {orbit(["folhaEscura", "folha"], 24, 56, 0.6, { spin: "" })}
      {Array.from({ length: 8 }, (_, i) => {
        const [x, y] = polar(58, 22 + i * 45);
        return <circle key={i} cx={x} cy={y} r={2.4} fill="#dc2626" />;
      })}
      {perch("laco", 180, 58, 1.5)}
    </>
  ),
  "moldura-presentes": () => (
    <>
      {perch("presente", 205, 60, 1.3)}
      {perch("presenteAzul", 182, 64, 1.1)}
      {perch("presente", 160, 62, 1)}
      {perch("presenteAzul", 140, 58, 0.9)}
    </>
  ),
  "moldura-estrela": () => (
    <>
      {place("estrela", 0, -64, 1.5, 0, "shine")}
      {orbit(["brilhoDourado"], 6, 62, 0.45, {
        spin: "spin-slow",
        each: "twinkle",
        arc: [40, 320],
      })}
    </>
  ),
  "moldura-noel": () => (
    <>
      {hat("gorro", 2.3, 9)}
      {perch("coqueiro", 232, 62, 1.9)}
      {perch("sol", 128, 62, 1.3)}
    </>
  ),
};
