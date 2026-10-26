import { useMemo, useRef } from "react";

import { Download, Moon, RotateCcw, Store, Sun, Upload } from "lucide-react";

import { reportThemeContrast, sameThemeSettings } from "../../lib/theme/build-theme-tokens.js";
import {
  PROFILE_NAME_COLORS,
  PROFILE_NAME_FONTS,
  PROFILE_NAME_THEMES,
  profileNameFontFamily,
  profileNameTheme,
  profileNameThemePaint,
} from "../../lib/theme/profile-name-fonts.js";
import { THEME_LIMITS } from "../../lib/theme/theme-defaults.js";
import { THEME_PRESETS } from "../../lib/theme/theme-presets.js";
import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { AppearanceDialogProps } from "../../types/domain/appearance/appearance-dialog-props.js";
import type { ProfileNameFont } from "../../types/lib/theme/profile-name-font.js";
import type { ProfileNameTheme } from "../../types/lib/theme/profile-name-theme.js";
import type { ThemeAccent } from "../../types/lib/theme/theme-accent.js";
import type { ThemeBackground } from "../../types/lib/theme/theme-background.js";
import type { ThemePresetId } from "../../types/lib/theme/theme-preset-id.js";
import { Button } from "../../ui/button.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog.js";

import { BackgroundStylePicker } from "./background-style-picker.js";
import { CollectionGrid } from "./collection-grid.js";
import { ContrastNotice } from "./contrast-notice.js";
import { PresetRow } from "./preset-row.js";
import { RangeField } from "./range-field.js";
import { ThemePreview } from "./theme-preview.js";

/** Sliders trabalham em 0–100; a conversão para o valor real fica aqui. */
const CHROMA_MAX = {
  accent: THEME_LIMITS.accentChroma.max,
  background: THEME_LIMITS.backgroundChroma.max,
} as const;

function percent(value: number, max: number): string {
  return `${Math.round((value / max) * 100)}%`;
}

/**
 * Personalização do tema.
 *
 * As mudanças valem na hora — o diálogo é o próprio preview, com uma amostra do
 * app ao lado e um aviso de contraste que avisa quando a combinação fica difícil
 * de ler. Não há "salvar" porque não há o que desfazer depois: é preferência.
 */
export function AppearanceDialog({
  open,
  onOpenChange,
  profileName,
  nameStyle,
  onNameStyleChange,
  mode,
  onModeChange,
  settings,
  onSettingsChange,
  collectionId,
  activeCollection,
  onCollectionSelect,
  widgetBackground,
  onWidgetBackgroundChange,
  pageBackground,
  onPageBackgroundChange,
  onExport,
  onImport,
  fileStatus,
  onSell,
  onReset,
  sellDialog,
}: AppearanceDialogProps) {
  const messages = useMessages().appearanceDialog;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedNameTheme: ProfileNameTheme = nameStyle.theme ?? "DEFAULT";
  const selectedNameThemeDefinition = profileNameTheme(selectedNameTheme);
  const selectedNameFont: ProfileNameFont = nameStyle.font ?? selectedNameThemeDefinition.font;
  const selectedNameColor = nameStyle.color ?? "#ff7a18";

  const report = useMemo(() => reportThemeContrast(settings, mode), [settings, mode]);

  const activePresetId = useMemo<ThemePresetId | null>(() => {
    const match = THEME_PRESETS.find((preset) => sameThemeSettings(preset.settings, settings));
    return match ? match.id : null;
  }, [settings]);

  const updateAccent = (patch: Partial<ThemeAccent>) =>
    onSettingsChange({ ...settings, accent: { ...settings.accent, ...patch } });

  const updateBackground = (patch: Partial<ThemeBackground>) =>
    onSettingsChange({ ...settings, background: { ...settings.background, ...patch } });

  const updateNameStyle = (
    patch: Partial<{
      theme: typeof selectedNameTheme;
      font: typeof selectedNameFont;
      color: string;
    }>,
  ) => {
    const nextTheme = patch.theme ?? selectedNameTheme;
    const nextThemeDefinition = profileNameTheme(nextTheme);
    onNameStyleChange({
      theme: nextTheme,
      font: patch.font ?? (patch.theme ? nextThemeDefinition.font : selectedNameFont),
      color: patch.color ?? (patch.theme ? nextThemeDefinition.colors[0] : selectedNameColor),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-normal">{messages.title}</DialogTitle>

          <DialogDescription>{messages.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <section className="space-y-2">
            <h3 className="text-xs font-medium text-text-strong">{messages.collectionsTitle}</h3>

            <p className="text-xs font-normal text-text-subtle">{messages.collectionsHint}</p>

            <CollectionGrid activeId={collectionId} onSelect={onCollectionSelect} />

            {activeCollection && (
              <p className="text-xs font-normal text-text-subtle">
                {messages.colorsNote(activeCollection.name)}
              </p>
            )}
          </section>

          <section className="space-y-3 border-t border-border-soft pt-4">
            <div className="space-y-0.5">
              <h3 className="text-xs font-medium text-text-strong">{messages.nameStyleTitle}</h3>

              <p className="text-xs font-normal text-text-subtle">{messages.nameStyleHint}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-medium text-text-strong">
                {messages.nameStyleThemesTitle}
              </h4>

              <p className="text-xs font-normal text-text-subtle">{messages.nameStyleThemesHint}</p>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {Object.entries(PROFILE_NAME_THEMES).map(([theme, definition]) => {
                  const themeId = theme as typeof selectedNameTheme;
                  const themeColors = profileNameThemePaint(themeId);
                  const gradient = definition.colors.length > 1;
                  return (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => updateNameStyle({ theme: themeId })}
                      aria-pressed={selectedNameTheme === themeId}
                      className={cn(
                        "rounded-xl border px-2 py-3 text-center text-sm transition",
                        selectedNameTheme === themeId
                          ? "border-primary bg-primary-soft text-primary"
                          : "border-border-soft bg-surface-1 text-text-subtle hover:border-primary/60 hover:text-text-strong",
                        definition.className,
                      )}
                      style={{
                        fontFamily: profileNameFontFamily(definition.font),
                        ...(gradient
                          ? {
                              backgroundImage: themeColors,
                              WebkitBackgroundClip: "text",
                              backgroundClip: "text",
                              color: "transparent",
                            }
                          : { color: definition.colors[0] }),
                      }}
                    >
                      {messages.nameStyleThemes[themeId]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {Object.entries(PROFILE_NAME_FONTS).map(([font, family]) => {
                const fontId = font as typeof selectedNameFont;
                return (
                  <button
                    key={font}
                    type="button"
                    onClick={() => updateNameStyle({ font: fontId })}
                    aria-pressed={selectedNameFont === fontId}
                    className={cn(
                      "rounded-xl border px-2 py-3 text-center text-xs transition",
                      selectedNameFont === fontId
                        ? "border-primary bg-primary-soft text-primary"
                        : "border-border-soft bg-surface-1 text-text-subtle hover:border-primary/60 hover:text-text-strong",
                    )}
                    style={{ fontFamily: family }}
                  >
                    {messages.nameStyleFonts[fontId]}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {PROFILE_NAME_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={messages.nameStyleUseColor(color)}
                  aria-pressed={selectedNameColor === color}
                  onClick={() => updateNameStyle({ color })}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 transition",
                    selectedNameColor === color
                      ? "border-text-strong ring-2 ring-primary ring-offset-2 ring-offset-surface-card"
                      : "border-transparent",
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
              <label className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-1 px-3 py-1.5 text-xs text-text-subtle">
                {messages.nameStyleOtherColor}
                <input
                  type="color"
                  value={selectedNameColor}
                  onChange={(event) => updateNameStyle({ color: event.target.value })}
                  className="h-6 w-6 cursor-pointer rounded-full border-0 bg-transparent p-0"
                />
              </label>
            </div>

            <div className="rounded-xl border border-border-soft bg-surface-1 px-4 py-3">
              <p className="text-xs text-text-subtle">{messages.nameStylePreview}</p>

              <p
                className={cn("mt-1 text-xl font-semibold", selectedNameThemeDefinition.className)}
                style={{
                  fontFamily: profileNameFontFamily(selectedNameFont),
                  ...(selectedNameThemeDefinition.colors.length > 1
                    ? {
                        backgroundImage: profileNameThemePaint(
                          selectedNameTheme,
                          selectedNameColor,
                        ),
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }
                    : { color: selectedNameColor }),
                }}
              >
                {profileName ?? messages.nameStylePreviewName}
              </p>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-xs font-medium text-text-strong">{messages.mode}</h3>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onModeChange("light")}
                aria-pressed={mode === "light"}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-normal transition",
                  mode === "light"
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border-soft bg-surface-1 text-text-subtle hover:text-text-strong",
                )}
              >
                <Sun className="h-3.5 w-3.5" />

                <>{messages.light}</>
              </button>

              <button
                type="button"
                onClick={() => onModeChange("dark")}
                aria-pressed={mode === "dark"}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-normal transition",
                  mode === "dark"
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border-soft bg-surface-1 text-text-subtle hover:text-text-strong",
                )}
              >
                <Moon className="h-3.5 w-3.5" />

                <>{messages.dark}</>
              </button>
            </div>
          </section>

          {/* As cores livres valem SEMPRE: sem tema, são o tema; com tema, são
              camada por cima (destaque e fundo — superfícies ficam do tema). */}
          <section className="space-y-2">
            <h3 className="text-xs font-medium text-text-strong">{messages.presets}</h3>

            <PresetRow activeId={activePresetId} onSelect={onSettingsChange} />
          </section>

          <section className="space-y-3">
            <div className="space-y-0.5">
              <h3 className="text-xs font-medium text-text-strong">{messages.accentSection}</h3>

              <p className="text-xs font-normal text-text-subtle">{messages.accentHint}</p>
            </div>

            <RangeField
              label={messages.hue}
              value={settings.accent.hue}
              min={THEME_LIMITS.hue.min}
              max={THEME_LIMITS.hue.max}
              step={1}
              valueLabel={messages.hueValue(Math.round(settings.accent.hue))}
              onChange={(hue) => updateAccent({ hue })}
              hueTrack
            />
            <RangeField
              label={messages.saturation}
              value={settings.accent.chroma}
              min={THEME_LIMITS.accentChroma.min}
              max={THEME_LIMITS.accentChroma.max}
              step={0.005}
              valueLabel={percent(settings.accent.chroma, CHROMA_MAX.accent)}
              onChange={(chroma) => updateAccent({ chroma })}
            />
            <RangeField
              label={messages.brightness}
              value={settings.accent.lightness}
              min={THEME_LIMITS.accentLightness.min}
              max={THEME_LIMITS.accentLightness.max}
              step={0.005}
              valueLabel={percent(
                settings.accent.lightness - THEME_LIMITS.accentLightness.min,
                THEME_LIMITS.accentLightness.max - THEME_LIMITS.accentLightness.min,
              )}
              onChange={(lightness) => updateAccent({ lightness })}
              hint={messages.brightnessHint}
            />
          </section>

          <section className="space-y-3">
            <div className="space-y-0.5">
              <h3 className="text-xs font-medium text-text-strong">{messages.backgroundSection}</h3>

              <p className="text-xs font-normal text-text-subtle">{messages.backgroundHint}</p>
            </div>

            {/* Plano de fundo: automático, cor sólida ou gradiente. Com fundo
                    escolhido, o tingimento fino não faz sentido e fica fora. */}
            {/* Cor de widget (o interno dos cartões/painéis) e plano de fundo (a
                página atrás de tudo) — cada um com cor sólida ou gradiente. */}
            <div className="space-y-2 border-t border-border-soft pt-3">
              <p className="text-xs font-medium text-text-strong">{messages.bgStyleTitle}</p>

              <p className="text-xs font-normal text-text-subtle">{messages.bgStyleHint}</p>

              <BackgroundStylePicker value={widgetBackground} onChange={onWidgetBackgroundChange} />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-text-strong">{messages.pageBgTitle}</p>

              <p className="text-xs font-normal text-text-subtle">{messages.pageBgHint}</p>

              <BackgroundStylePicker value={pageBackground} onChange={onPageBackgroundChange} />
            </div>

            {!activeCollection && !pageBackground && (
              <>
                <RangeField
                  label={messages.hue}
                  value={settings.background.hue}
                  min={THEME_LIMITS.hue.min}
                  max={THEME_LIMITS.hue.max}
                  step={1}
                  valueLabel={messages.hueValue(Math.round(settings.background.hue))}
                  onChange={(hue) => updateBackground({ hue })}
                  hueTrack
                />
                <RangeField
                  label={messages.backgroundIntensity}
                  value={settings.background.chroma}
                  min={THEME_LIMITS.backgroundChroma.min}
                  max={THEME_LIMITS.backgroundChroma.max}
                  step={0.001}
                  valueLabel={percent(settings.background.chroma, CHROMA_MAX.background)}
                  onChange={(chroma) => updateBackground({ chroma })}
                />
              </>
            )}
          </section>

          <section className="space-y-2">
            <h3 className="text-xs font-medium text-text-strong">{messages.preview}</h3>

            <ThemePreview />
            {!activeCollection && <ContrastNotice report={report} />}
          </section>

          <section className="space-y-2 border-t border-border-soft pt-3">
            <h3 className="text-xs font-medium text-text-strong">{messages.fileSection}</h3>

            <p className="text-xs font-normal text-text-subtle">{messages.fileHint}</p>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-auto rounded-full gap-2 text-xs"
                onClick={onExport}
              >
                <Download className="h-3.5 w-3.5" />

                <>{messages.exportTheme}</>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-auto rounded-full gap-2 text-xs"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-3.5 w-3.5" />

                <>{messages.importTheme}</>
              </Button>

              {/* Qualquer aparência (coleção + cores livres + fundos) pode virar tema e ser
                  vendida: o marketplace deixa de ser só "tema de coleção". */}
              <Button
                type="button"
                variant="outline"
                className="w-auto rounded-full gap-2 text-xs"
                onClick={onSell}
              >
                <Store className="h-3.5 w-3.5" />

                <>{messages.sellTheme}</>
              </Button>
            </div>

            {/* O input fica escondido: quem abre é o botão de importar. */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".enois-theme,application/json"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (file) onImport(file);
              }}
            />

            {fileStatus && (
              <p
                className={cn(
                  "text-xs",
                  fileStatus.kind === "ok" ? "text-growth" : "text-destructive",
                )}
              >
                {fileStatus.kind === "ok"
                  ? messages.fileImported
                  : messages.fileErrors[fileStatus.reason]}
              </p>
            )}
          </section>

          <div className="flex flex-wrap justify-between gap-2 border-t border-border-soft pt-4">
            <Button
              type="button"
              variant="ghost"
              className="w-auto rounded-full gap-2 text-sm"
              onClick={onReset}
            >
              <RotateCcw className="h-3.5 w-3.5" />

              <>{messages.reset}</>
            </Button>

            <Button
              type="button"
              className="w-auto rounded-full px-6 text-sm"
              onClick={() => onOpenChange(false)}
            >
              {messages.done}
            </Button>
          </div>
        </div>
      </DialogContent>

      {sellDialog}
    </Dialog>
  );
}
