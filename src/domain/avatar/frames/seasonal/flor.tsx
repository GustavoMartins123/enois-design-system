import type { SeasonalFrameArt } from "../../../../types/domain/avatar/seasonal-frame-art.js";
import { polar } from "../../avatar-frames.js";

import { arcsRing, fallers, orbit, perch, place, sun, wings } from "./frame-kit.js";

const ARARA_FEATHERS = [
  ["#dc2626", -104, 21],
  ["#facc15", -86, 24],
  ["#2563eb", -68, 26],
  ["#dc2626", -50, 24],
  ["#2563eb", -32, 19],
] as const;

const ARARA_WING = (
  <>
    {ARARA_FEATHERS.map(([c, a, l]) => (
      <ellipse
        key={a}
        cy={-l}
        rx={5}
        ry={l}
        fill={c}
        stroke="rgba(0,0,0,.18)"
        strokeWidth={0.8}
        transform={`rotate(${a})`}
      />
    ))}
  </>
);

/** A bunch of ipê flowers on a twig, at angle `a` of the circle. */
function ipeCluster(a: number) {
  const [x, y] = polar(58, a);
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <path d="M-14 6 Q0 -2 14 6" stroke="#78350f" strokeWidth={1.6} fill="none" />
      {place("ipe", -9, 0, 0.62, 10)}
      {place("ipe", 0, -5, 0.78)}
      {place("ipe", 9, 0, 0.58, -12)}
    </g>
  );
}

/** Florada: an event reward that grows one ipê bunch per week of September with posts. */
function florada(stage = 6) {
  return (
    <>
      {[-40, 140, 40, 220, -100, 100].slice(0, stage).map((a) => {
        const [x, y] = polar(58, a);
        return (
          <g key={a} transform={`translate(${x} ${y}) rotate(${a})`}>
            <path d="M-12 6 Q0 -2 12 6" stroke="#78350f" strokeWidth={1.6} fill="none" />
            {place("ipe", -7, 0, 0.55)}
            {place("ipe", 0, -4, 0.7)}
            {place("ipe", 7, 0, 0.5)}
          </g>
        );
      })}
    </>
  );
}

export const FLOR_FRAMES: Record<string, SeasonalFrameArt> = {
  "moldura-asas-arara": () => wings(ARARA_WING, 38, -8),
  "moldura-coroa-flores": () => (
    <>
      {orbit(["folha", "folhaEscura"], 9, 47, 0.55, { spin: "", arc: [-80, 80] })}
      {orbit(["florRosa", "florAmarela", "florAzul"], 7, 50, 0.6, {
        spin: "",
        arc: [-66, 66],
        rotate: false,
        each: "bob",
        stagger: 0.3,
      })}
    </>
  ),
  "moldura-ipe": () => (
    <>
      {ipeCluster(-40)}
      {ipeCluster(140)}
      {fallers(["ipe"], 5, 81, 0.25, "drift", 120)}
    </>
  ),
  "moldura-arara": () => (
    <>
      {arcsRing(
        [
          ["#dc2626", 200, 300],
          ["#2563eb", 300, 380],
          ["#facc15", 20, 70],
        ],
        55,
        3,
      )}
      {perch("arara", 62, 60, 1.9, 0, "bob")}
    </>
  ),
  "moldura-tucano": () => (
    <>
      {orbit(["folhaEscura"], 6, 58, 0.7, { spin: "", arc: [-110, -10] })}
      {perch("tucano", -52, 60, 1.9, 0, "bob")}
    </>
  ),
  "moldura-beija-flor": () => (
    <>
      {orbit(["florRosa", "florAmarela"], 4, 58, 0.55, { spin: "", arc: [110, 250] })}
      {orbit(["beijaflor"], 1, 66, 1.3, { spin: "spin-fast", rotOff: 0 })}
    </>
  ),
  "moldura-mandacaru": () => (
    <>
      {perch("mandacaru", 225, 60, 2)}
      {perch("mandacaru", 140, 62, 1.5)}
      {sun(62, 40)}
    </>
  ),
  "moldura-florada": () => florada(),
};
