import { hexToHsl, hslToHex } from "../../lib/theme/color.js";
import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { BackgroundStylePickerProps } from "../../types/domain/appearance/background-style-picker-props.js";
import type { PillButtonProps } from "../../types/domain/appearance/pill-button-props.js";
import type { BackgroundStyle } from "../../types/lib/theme/background-style.js";

import { RangeField } from "./range-field.js";

/** Valores de partida: dois matizes e transparências plenas — o usuário afina dali. */
const DEFAULTS = {
  color: hslToHex(258, 30, 95),
  alpha: 100,
  from: hslToHex(258, 30, 90),
  fromAlpha: 100,
  to: hslToHex(258, 30, 70),
  toAlpha: 100,
  direction: "diagonal" as const,
  angle: 135,
};

const DIRECTIONS = [
  { id: "diagonal", angle: 135 },
  { id: "horizontal", angle: 90 },
  { id: "vertical", angle: 180 },
  { id: "radial", angle: 135 },
] as const;

function Pill({ active, onClick, children }: PillButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-normal transition",
        active
          ? "border-primary bg-primary-soft text-primary"
          : "border-border-soft bg-surface-1 text-text-subtle hover:text-text-strong",
      )}
    >
      {children}
    </button>
  );
}

/** Ângulo efetivo: o livre quando é custom; o preset da direção, caso contrário. */
function angleFor(value: BackgroundStyle): number {
  return value.direction === "custom"
    ? value.angle
    : (DIRECTIONS.find((d) => d.id === value.direction)?.angle ?? 135);
}

/**
 * Escolha de cor/gradiente com transparência, no estilo das cores livres.
 *
 * Cor sólida: matiz, saturação, brilho e TRANSPARÊNCIA. Gradiente: DOIS matizes (o
 * degradê vai de um ao outro), saturação única, brilho por ponta, TRANSPARÊNCIA por
 * ponta — o "vidro" que vai de um alpha a outro —, direção em pílulas e ÂNGULO
 * livre (0–360°) para as lineares. O texto do widget se adapta sozinho ao resultado.
 */
export function BackgroundStylePicker({ value, onChange }: BackgroundStylePickerProps) {
  const messages = useMessages().backgroundStylePicker;
  const modes: { id: "solid" | "gradient" | null; label: string }[] = [
    { id: null, label: messages.bgStyleAuto },
    { id: "solid", label: messages.bgStyleSolid },
    { id: "gradient", label: messages.bgStyleGradient },
  ];
  const directionLabels = {
    diagonal: messages.bgStyleDiagonal,
    horizontal: messages.bgStyleHorizontal,
    vertical: messages.bgStyleVertical,
    radial: messages.bgStyleRadial,
  };
  const mode: "solid" | "gradient" | null = value?.type ?? null;

  const set = (patch: Partial<BackgroundStyle>) =>
    onChange({
      type: value?.type ?? "solid",
      color: value?.color ?? DEFAULTS.color,
      alpha: value?.alpha ?? DEFAULTS.alpha,
      from: value?.from ?? DEFAULTS.from,
      fromAlpha: value?.fromAlpha ?? DEFAULTS.fromAlpha,
      to: value?.to ?? DEFAULTS.to,
      toAlpha: value?.toAlpha ?? DEFAULTS.toAlpha,
      direction: value?.direction ?? DEFAULTS.direction,
      angle: value?.angle ?? DEFAULTS.angle,
      ...patch,
    });

  const hueLabel = (hue: number) => messages.hueValue(Math.round(hue));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {modes.map((option) => (
          <Pill
            key={option.label}
            active={mode === option.id}
            onClick={() =>
              onChange(
                option.id === null ? null : ({ ...DEFAULTS, type: option.id } as BackgroundStyle),
              )
            }
          >
            {option.label}
          </Pill>
        ))}
      </div>

      {mode === "solid" && value && (
        <div className="space-y-2">
          {(() => {
            const colour = hexToHsl(value.color);
            return (
              <>
                <RangeField
                  label={messages.hue}
                  value={colour.h}
                  min={0}
                  max={360}
                  step={1}
                  valueLabel={hueLabel(colour.h)}
                  onChange={(hue) => set({ color: hslToHex(hue, colour.s, colour.l) })}
                  hueTrack
                />
                <RangeField
                  label={messages.saturation}
                  value={colour.s}
                  min={0}
                  max={100}
                  step={1}
                  valueLabel={`${colour.s}%`}
                  onChange={(saturation) =>
                    set({ color: hslToHex(colour.h, saturation, colour.l) })
                  }
                />
                <RangeField
                  label={messages.brightness}
                  value={colour.l}
                  min={0}
                  max={100}
                  step={1}
                  valueLabel={`${colour.l}%`}
                  onChange={(lightness) => set({ color: hslToHex(colour.h, colour.s, lightness) })}
                />
                <RangeField
                  label={messages.bgStyleAlpha}
                  value={value.alpha}
                  min={5}
                  max={100}
                  step={1}
                  valueLabel={`${value.alpha}%`}
                  onChange={(alpha) => set({ alpha })}
                  hint={messages.bgStyleAlphaHint}
                />
              </>
            );
          })()}
        </div>
      )}

      {mode === "gradient" && value && (
        <div className="space-y-2">
          {(() => {
            const first = hexToHsl(value.from);
            const second = hexToHsl(value.to);
            return (
              <>
                <RangeField
                  label={messages.bgStyleHueFrom}
                  value={first.h}
                  min={0}
                  max={360}
                  step={1}
                  valueLabel={hueLabel(first.h)}
                  onChange={(hue) => set({ from: hslToHex(hue, first.s, first.l) })}
                  hueTrack
                />
                <RangeField
                  label={messages.bgStyleHueTo}
                  value={second.h}
                  min={0}
                  max={360}
                  step={1}
                  valueLabel={hueLabel(second.h)}
                  onChange={(hue) => set({ to: hslToHex(hue, second.s, second.l) })}
                  hueTrack
                />
                <RangeField
                  label={messages.saturation}
                  value={first.s}
                  min={0}
                  max={100}
                  step={1}
                  valueLabel={`${first.s}%`}
                  onChange={(saturation) =>
                    set({
                      from: hslToHex(first.h, saturation, first.l),
                      to: hslToHex(second.h, saturation, second.l),
                    })
                  }
                />
                <RangeField
                  label={messages.bgStyleBrightnessFrom}
                  value={first.l}
                  min={0}
                  max={100}
                  step={1}
                  valueLabel={`${first.l}%`}
                  onChange={(lightness) => set({ from: hslToHex(first.h, first.s, lightness) })}
                />
                <RangeField
                  label={messages.bgStyleBrightnessTo}
                  value={second.l}
                  min={0}
                  max={100}
                  step={1}
                  valueLabel={`${second.l}%`}
                  onChange={(lightness) => set({ to: hslToHex(second.h, second.s, lightness) })}
                />
                <RangeField
                  label={messages.bgStyleFromAlpha}
                  value={value.fromAlpha}
                  min={5}
                  max={100}
                  step={1}
                  valueLabel={`${value.fromAlpha}%`}
                  onChange={(alpha) => set({ fromAlpha: alpha })}
                />
                <RangeField
                  label={messages.bgStyleToAlpha}
                  value={value.toAlpha}
                  min={5}
                  max={100}
                  step={1}
                  valueLabel={`${value.toAlpha}%`}
                  onChange={(alpha) => set({ toAlpha: alpha })}
                  hint={messages.bgStyleAlphaRampHint}
                />

                <div className="flex flex-wrap gap-2">
                  {DIRECTIONS.map((direction) => (
                    <Pill
                      key={direction.id}
                      active={value.direction === direction.id}
                      onClick={() => set({ direction: direction.id, angle: direction.angle })}
                    >
                      {directionLabels[direction.id]}
                    </Pill>
                  ))}
                </div>

                {value.direction !== "radial" && (
                  <RangeField
                    label={messages.bgStyleAngle}
                    value={angleFor(value)}
                    min={0}
                    max={360}
                    step={1}
                    valueLabel={`${angleFor(value)}°`}
                    onChange={(angle) => set({ direction: "custom", angle })}
                  />
                )}
              </>
            );
          })()}
        </div>
      )}

      {mode !== null && (
        <p className="text-xs font-normal text-text-subtle">{messages.bgStyleContrastNote}</p>
      )}
    </div>
  );
}
