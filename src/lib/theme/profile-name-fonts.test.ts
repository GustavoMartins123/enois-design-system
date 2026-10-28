import { describe, expect, it } from "vitest";

import {
  FREE_PROFILE_NAME_THEMES,
  PROFILE_NAME_THEMES,
  profileNameTheme,
  profileNameThemeFontFamily,
  profileNameThemePaint,
} from "./profile-name-fonts.js";

describe("seasonal name themes", () => {
  it("paints the exact prototype gradient and ignores the chosen color", () => {
    expect(profileNameThemePaint("nome-saci", "#000000")).toBe(
      "linear-gradient(90deg, #16a34a, #65a30d 45%, #dc2626)",
    );
    expect(profileNameThemePaint("nome-pisca")).toContain("#16a34a 20% 40%");
  });

  it("builds the paint from the colors when the theme has no exact paint", () => {
    expect(profileNameThemePaint("nome-noite")).toBe("linear-gradient(90deg, #f97316, #a855f7)");
  });

  it("uses the theme's web font with fallbacks unless a font was chosen", () => {
    expect(profileNameThemeFontFamily("nome-assombrado")).toContain('"Creepster"');
    expect(profileNameThemeFontFamily("nome-assombrado")).toMatch(/fantasy$/);
    expect(profileNameThemeFontFamily("nome-assombrado", "MONO")).toContain("Courier New");
    expect(profileNameThemeFontFamily("nome-8bit")).toContain("Press Start 2P");
  });

  it("falls back to DEFAULT for an unknown theme", () => {
    expect(profileNameTheme("nome-do-futuro" as never)).toBe(PROFILE_NAME_THEMES.DEFAULT);
  });

  it("keeps the seasonal themes out of the free list", () => {
    expect(FREE_PROFILE_NAME_THEMES).toHaveLength(12);
    expect(FREE_PROFILE_NAME_THEMES.some((theme) => theme.startsWith("nome-"))).toBe(false);
  });
});
