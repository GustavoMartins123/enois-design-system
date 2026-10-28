// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PROFILE_NAME_THEMES } from "../../lib/theme/profile-name-fonts.js";
import { AvatarFrameFx } from "../avatar/avatar-frame-fx.js";
import { FX_FRAMES, SEASONAL_FX_FRAMES } from "../avatar/avatar-frames.js";
import { SEASONAL_FRAME_ART } from "../avatar/frames/seasonal/seasonal-frame-art.js";
import { OfficialBadge } from "../badges/official-badge.js";
import { OFFICIAL_BADGE_ICONS } from "../badges/official-badges.js";

import { CARD_THEMES } from "./card-themes.js";
import { CATALOG_COLLECTIONS, CATALOG_LOOKS, CATALOG_REWARDS } from "./cosmetic-catalog.fixture.js";
import { COSMETIC_ICONS } from "./cosmetic-icons.js";
import { NAMEPLATES } from "./nameplates.js";
import { OfficialBanner } from "./official-banner.js";
import { OFFICIAL_BANNERS } from "./official-banners.js";
import { PROFILE_EFFECTS } from "./profile-effects.js";

const catalog = [...CATALOG_COLLECTIONS.flatMap((c) => c.items), ...CATALOG_REWARDS];
const idsOf = (kind: string) => catalog.filter((item) => item.kind === kind).map((item) => item.id);
const hasIcon = (key: string) => Object.hasOwn(COSMETIC_ICONS, key);

describe("seasonal cosmetics registries", () => {
  it("draws every catalog frame as an FX frame", () => {
    const frames = idsOf("frame");
    expect(frames.length).toBeGreaterThan(60);
    for (const id of frames) {
      expect(SEASONAL_FRAME_ART, id).toHaveProperty([id]);
      expect(FX_FRAMES as readonly string[], id).toContain(id);
      expect(renderToStaticMarkup(<AvatarFrameFx frame={id} />), id).toContain("<svg");
    }
    expect([...SEASONAL_FX_FRAMES].sort()).toEqual(Object.keys(SEASONAL_FRAME_ART).sort());
  });

  it("draws every catalog badge and event reward as an official badge", () => {
    for (const id of idsOf("badge")) {
      expect(OFFICIAL_BADGE_ICONS, id).toHaveProperty([id]);
      expect(hasIcon(OFFICIAL_BADGE_ICONS[id]), id).toBe(true);
      expect(renderToStaticMarkup(<OfficialBadge badge={id} />), id).toContain("<svg");
    }
    const icon = (id: string) => catalog.find((item) => item.id === id)?.icon;
    for (const id of idsOf("badge")) expect(OFFICIAL_BADGE_ICONS[id], id).toBe(icon(id));
  });

  it("marks the duel victory badges with a gold star", () => {
    const plain = renderToStaticMarkup(<OfficialBadge badge="emblema-time-saci" />);
    const victory = renderToStaticMarkup(<OfficialBadge badge="emblema-vitoria-saci" />);
    expect(victory.length).toBeGreaterThan(plain.length);
    expect(victory).toContain("#facc15");
  });

  it("has a name theme, card theme, nameplate, banner and effect for every catalog id", () => {
    for (const id of idsOf("name")) expect(PROFILE_NAME_THEMES, id).toHaveProperty([id]);
    for (const id of idsOf("theme")) expect(CARD_THEMES, id).toHaveProperty([id]);
    for (const id of idsOf("plate")) expect(NAMEPLATES, id).toHaveProperty([id]);
    for (const id of idsOf("banner")) {
      expect(OFFICIAL_BANNERS, id).toHaveProperty([id]);
      expect(renderToStaticMarkup(<OfficialBanner banner={id} />), id).toContain("<svg");
    }
    for (const id of idsOf("effect")) expect(PROFILE_EFFECTS, id).toHaveProperty([id]);
  });

  it("only references icons that exist", () => {
    const keys = [
      ...Object.values(NAMEPLATES).flatMap((plate) => plate.icons),
      ...Object.values(OFFICIAL_BANNERS).flatMap((banner) => banner.icons),
      ...Object.values(PROFILE_EFFECTS).flatMap((effect) => [effect.icon, ...effect.icons]),
      ...CATALOG_LOOKS.map((look) => look.statusIcon),
    ];
    for (const key of keys) expect(hasIcon(key), key).toBe(true);
  });

  it("finds every look item in the catalog", () => {
    const ids = new Set(catalog.map((item) => item.id));
    for (const look of CATALOG_LOOKS) {
      const items = [look.theme, look.frame, look.nameStyle, look.effect, look.banner, look.plate];
      for (const id of [...items, ...look.badges].filter(Boolean)) {
        expect(ids.has(id as string), `${look.collection}: ${id}`).toBe(true);
      }
    }
  });

  it("renders nothing for ids this client does not know", () => {
    expect(renderToStaticMarkup(<AvatarFrameFx frame="moldura-futura" />)).toBe("");
    expect(renderToStaticMarkup(<OfficialBadge badge="emblema-futuro" />)).toBe("");
    expect(renderToStaticMarkup(<OfficialBanner banner="banner-futuro" />)).toBe("");
  });
});
