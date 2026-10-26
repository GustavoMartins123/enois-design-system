import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { DEFAULT_THEME_SETTINGS } from "../../lib/theme/theme-defaults.js";
import type { BackgroundStyle } from "../../types/lib/theme/background-style.js";
import type { ProfileNameStyle } from "../../types/lib/theme/profile-name-style.js";
import type { ThemeSettings } from "../../types/lib/theme/theme-settings.js";
import type { Theme } from "../../types/lib/theme/theme.js";

import { AppearanceDialog } from "./appearance-dialog.js";
import { ThemeSellDialog } from "./theme-sell-dialog.js";

const meta: Meta = {
  title: "Domain/Appearance",
};

export default meta;

export const Dialog: StoryObj = {
  render: function DialogStory() {
    const [mode, setMode] = useState<Theme>("light");
    const [settings, setSettings] = useState<ThemeSettings>(DEFAULT_THEME_SETTINGS);
    const [collectionId, setCollectionId] = useState<string | null>(null);
    const [widget, setWidget] = useState<BackgroundStyle | null>(null);
    const [page, setPage] = useState<BackgroundStyle | null>(null);
    const [nameStyle, setNameStyle] = useState<ProfileNameStyle | null>(null);
    const [sellOpen, setSellOpen] = useState(false);

    return (
      <AppearanceDialog
        open
        onOpenChange={() => {}}
        profileName="Marina Rocha"
        nameStyle={{
          theme: nameStyle?.theme ?? null,
          font: nameStyle?.font ?? null,
          color: nameStyle?.color ?? null,
        }}
        onNameStyleChange={setNameStyle}
        mode={mode}
        onModeChange={setMode}
        settings={settings}
        onSettingsChange={setSettings}
        collectionId={collectionId}
        activeCollection={null}
        onCollectionSelect={setCollectionId}
        widgetBackground={widget}
        onWidgetBackgroundChange={setWidget}
        pageBackground={page}
        onPageBackgroundChange={setPage}
        onExport={() => {}}
        onImport={() => {}}
        fileStatus={null}
        onSell={() => setSellOpen(true)}
        onReset={() => setSettings(DEFAULT_THEME_SETTINGS)}
        sellDialog={
          <ThemeSellDialog
            open={sellOpen}
            onOpenChange={setSellOpen}
            defaultName=""
            parsePrice={(text) => (Number(text) > 0 ? Number(text) * 1000 : null)}
            formatPrice={(value) => String(value / 1000)}
            onSubmit={() => setSellOpen(false)}
          />
        }
      />
    );
  },
};
