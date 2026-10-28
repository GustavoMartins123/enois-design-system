import { type CSSProperties, type ReactElement, type ReactNode, cloneElement } from "react";

import type { SeasonalFrameRange } from "../../../../types/domain/avatar/seasonal-frame-range.js";
import type { SeasonalOrbitOptions } from "../../../../types/domain/avatar/seasonal-orbit-options.js";
import type { SeasonalWaveOptions } from "../../../../types/domain/avatar/seasonal-wave-options.js";
import { COSMETIC_ICONS } from "../../../cosmetics/cosmetic-icons.js";
import { polar, round, seededRandom } from "../../avatar-frames.js";

/*
 * Generators of the seasonal frames, ported from the approved prototype (atelie-enois.html).
 * Same conventions as the other FX frames: viewBox -80..80, avatar radius 50, 0° at the top and
 * clockwise. Every random value comes from `seededRandom`, so server and browser draw the same.
 * Motion is a `cos-anim cos-<name>` class; the keyframes live in one block of styles.css.
 */

/** Adds index keys to a generated list of SVG nodes. */
export function keyed(list: ReactElement[]): ReactElement[] {
  return list.map((node, index) => cloneElement(node, { key: index }));
}

/** Class and timing of an animated node; an empty name means a still node. */
export function anim(name: string, delay = 0, duration?: number) {
  const style: CSSProperties = { animationDelay: `${round(delay)}s` };
  if (duration) style.animationDuration = `${round(duration)}s`;
  return { className: `cos-anim cos-${name}`, style };
}

export function arc(r: number, a1: number, a2: number): string {
  const [x1, y1] = polar(r, a1);
  const [x2, y2] = polar(r, a2);
  return `M${x1} ${y1} A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${x2} ${y2}`;
}

export function flame(w: number, h: number): string {
  return `M${-w} 0 C${-w} ${round(-h * 0.45)} ${round(-w * 0.15)} ${round(-h * 0.55)} 0 ${-h} C${round(w * 0.15)} ${round(-h * 0.55)} ${w} ${round(-h * 0.45)} ${w} 0 C${round(w * 0.55)} ${round(w * 0.9)} ${round(-w * 0.55)} ${round(w * 0.9)} ${-w} 0 Z`;
}

export function polarWave(r: number, amp: number, freq: number, phase: number): string {
  let d = "";
  for (let i = 0; i <= 120; i++) {
    const t = i * 3;
    const [x, y] = polar(r + amp * Math.sin(((t * freq + phase) * Math.PI) / 180), t);
    d += `${i ? "L" : "M"}${x} ${y} `;
  }
  return `${d}Z`;
}

export function icon(key: string): ReactElement | null {
  return Object.hasOwn(COSMETIC_ICONS, key) ? COSMETIC_ICONS[key] : null;
}

/** An icon moved, turned and scaled; `cls` animates it around its own center. */
export function place(
  key: string,
  x: number,
  y: number,
  s = 1,
  rot = 0,
  cls = "",
  delay = 0,
  duration?: number,
): ReactElement {
  return (
    <g transform={`translate(${round(x)} ${round(y)}) rotate(${round(rot)}) scale(${s})`}>
      {cls ? <g {...anim(cls, delay, duration)}>{icon(key)}</g> : icon(key)}
    </g>
  );
}

/** An icon sitting on the circle of radius `r` at angle `a`. */
export function perch(
  key: string,
  a: number,
  r: number,
  s = 1,
  rot = 0,
  cls = "",
  delay = 0,
): ReactElement {
  const [x, y] = polar(r, a);
  return place(key, x, y, s, rot, cls, delay);
}

/** An icon worn on the head: its bottom edge rests on top of the avatar. */
export function hat(key: string, s: number, bottom = 8.5): ReactElement {
  return place(key, 0, -38 - bottom * s, s);
}

/** Icons spread around the avatar (or along an arc), optionally spinning as a group. */
export function orbit(
  keys: readonly string[],
  n: number,
  r: number,
  s: number,
  {
    spin = "spin",
    arc: range,
    rotate = true,
    rotOff = 0,
    each = "",
    stagger = 0.2,
    jitter = 0,
    seed = 1,
  }: SeasonalOrbitOptions = {},
): ReactElement {
  const rnd = seededRandom(seed);
  const items = Array.from({ length: n }, (_, i) => {
    const a = range
      ? range[0] + (n === 1 ? 0 : (i * (range[1] - range[0])) / (n - 1))
      : (i * 360) / n;
    const [x, y] = polar(r + (jitter ? (rnd() - 0.5) * jitter : 0), a);
    return place(keys[i % keys.length], x, y, s, rotate ? a + rotOff : 0, each, -i * stagger);
  });
  return spin ? <g {...anim(spin)}>{keyed(items)}</g> : <>{keyed(items)}</>;
}

export function ring(c: string, w = 1.5, dash = "", r = 54): ReactElement {
  return (
    <circle
      r={r}
      fill="none"
      stroke={c}
      strokeWidth={w}
      strokeDasharray={dash || undefined}
      strokeLinecap="round"
    />
  );
}

export function wave(
  c: string,
  { r = 60, amp = 5, freq = 5, phase = 0, w = 2.2 }: SeasonalWaveOptions = {},
): ReactElement {
  return (
    <path
      d={polarWave(r, amp, freq, phase)}
      fill="none"
      stroke={c}
      strokeWidth={w}
      strokeLinecap="round"
    />
  );
}

export function ripples(c: string, r = 52): ReactElement {
  return (
    <>
      {[0, -1.2, -2.4].map((d) => (
        <circle key={d} {...anim("ripple", d)} r={r} fill="none" stroke={c} strokeWidth={1.4} />
      ))}
    </>
  );
}

/** Icons falling from the top edge. */
export function fallers(
  keys: readonly string[],
  n: number,
  seed: number,
  s: number,
  cls = "melt",
  spread = 140,
): ReactElement {
  const rnd = seededRandom(seed);
  const items = Array.from({ length: n }, (_, i) =>
    place(
      keys[i % keys.length],
      (i / Math.max(1, n - 1) - 0.5) * spread + (rnd() - 0.5) * 8,
      -74 + rnd() * 6,
      s,
      0,
      cls,
      -rnd() * 4,
      3.4 + rnd() * 1.8,
    ),
  );
  return <>{keyed(items)}</>;
}

/** Icons rising from a box (smoke, bubbles). */
export function risers(
  keys: readonly string[],
  n: number,
  seed: number,
  s: number,
  x: SeasonalFrameRange = [-60, 60],
  y: SeasonalFrameRange = [44, 62],
): ReactElement {
  const rnd = seededRandom(seed);
  const items = Array.from({ length: n }, (_, i) =>
    place(
      keys[i % keys.length],
      x[0] + rnd() * (x[1] - x[0]),
      y[0] + rnd() * (y[1] - y[0]),
      s,
      0,
      "rise",
      -rnd() * 4,
      3.2 + rnd() * 1.6,
    ),
  );
  return <>{keyed(items)}</>;
}

/** Icons popping in and out around the avatar (fireworks, sparklers). */
export function bursts(
  keys: readonly string[],
  n: number,
  seed: number,
  s: number,
  range: SeasonalFrameRange = [0, 360],
  rr: SeasonalFrameRange = [58, 70],
): ReactElement {
  const rnd = seededRandom(seed);
  const items = Array.from({ length: n }, (_, i) => {
    const [x, y] = polar(rr[0] + rnd() * (rr[1] - rr[0]), range[0] + rnd() * (range[1] - range[0]));
    return place(
      keys[i % keys.length],
      x,
      y,
      s * (0.8 + rnd() * 0.5),
      0,
      "pop",
      -rnd() * 2.4,
      2 + rnd(),
    );
  });
  return <>{keyed(items)}</>;
}

/** Flickering flames on the circle, taller at the top. */
export function flames(
  n: number,
  r: number,
  range: SeasonalFrameRange,
  colors: readonly string[],
  seed = 11,
): ReactElement {
  const rnd = seededRandom(seed);
  const items = Array.from({ length: n }, (_, i) => {
    const a = range[0] + (i * (range[1] - range[0])) / (n - 1);
    const [x, y] = polar(r, a);
    const top = (1 + Math.cos((a * Math.PI) / 180)) / 2;
    const delay = -rnd();
    const duration = 0.5 + rnd() * 0.4;
    return (
      <g transform={`translate(${x} ${y}) rotate(${round(a)})`}>
        <path
          {...anim("flick", delay, duration)}
          d={flame(3.4, 8 + 10 * top + rnd() * 5)}
          fill={colors[i % colors.length]}
        />
      </g>
    );
  });
  return <>{keyed(items)}</>;
}

/** Text running around the avatar on a circular path; `id` must be unique on the page. */
export function textRing(
  id: string,
  text: string,
  c: string,
  size = 7.2,
  font = "JetBrains Mono, ui-monospace, monospace",
  r = 61,
  spin = "spin-slow",
): ReactElement {
  return (
    <>
      <defs>
        <path id={id} d={arc(r, 0, 359.9)} />
      </defs>

      <g {...anim(spin)}>
        <text fontFamily={font} fontSize={size} fontWeight={700} fill={c}>
          <textPath href={`#${id}`} textLength={round(2 * Math.PI * r - 12)} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </g>
    </>
  );
}

/** A string of Christmas lights blinking out of step. */
export function lights(n: number, colors: readonly string[], r = 56): ReactElement {
  const bulbs = Array.from({ length: n }, (_, i) => {
    const a = (i * 360) / n;
    const c = colors[i % colors.length];
    const [x, y] = polar(r, a);
    return (
      <g transform={`translate(${x} ${y}) rotate(${a})`}>
        <rect x={-1.6} y={-1.2} width={3.2} height={2.6} rx={0.6} fill="#14532d" />

        <g {...anim("blink", -(i % 4) * 0.6)}>
          <ellipse cy={-6} rx={5} ry={6.5} fill={c} opacity={0.28} />
          <ellipse cy={-5.4} rx={2.7} ry={4} fill={c} />
        </g>
      </g>
    );
  });
  return (
    <>
      <path d={polarWave(r, 1.4, 16, 0)} fill="none" stroke="#166534" strokeWidth={1.4} />
      {keyed(bulbs)}
    </>
  );
}

export function pixelRing(colors: readonly string[]): ReactElement {
  const pixels = Array.from({ length: 40 }, (_, i) => {
    const a = i * 9;
    const [x, y] = polar(56, a);
    return (
      <g transform={`translate(${x} ${y}) rotate(${a})`}>
        <rect
          {...anim("blink", -(i % 5) * 0.4)}
          x={-2.6}
          y={-2.6}
          width={5.2}
          height={5.2}
          fill={colors[i % colors.length]}
        />
      </g>
    );
  });
  return <>{keyed(pixels)}</>;
}

export function arcsRing(
  parts: readonly (readonly [string, number, number])[],
  r = 55,
  w = 3.4,
): ReactElement {
  return (
    <>
      {parts.map(([c, a, b]) => (
        <path
          key={`${c}${a}`}
          d={arc(r, a, b)}
          stroke={c}
          strokeWidth={w}
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

/** Two mirrored wings behind the avatar, flapping slowly. */
export function wings(art: ReactNode, x = 36, y = -14): ReactElement {
  return (
    <>
      <g transform={`translate(${-x} ${y})`}>
        <g {...anim("wing")}>{art}</g>
      </g>

      <g transform={`translate(${x} ${y}) scale(-1 1)`}>
        <g {...anim("wing")}>{art}</g>
      </g>
    </>
  );
}

/** The summer sun at angle `a` on the circle of radius `r`, spinning slowly. */
export function sun(r: number, a: number): ReactElement {
  return (
    <g transform={`translate(${polar(r, a).join(" ")})`}>
      <g {...anim("spin-slow")}>{icon("sol")}</g>
    </g>
  );
}
