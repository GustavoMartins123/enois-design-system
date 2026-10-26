import type { Meta, StoryObj } from "@storybook/react-vite";

import { HealthyUsageDialog } from "./healthy-usage-dialog.js";
import { HealthyUsageReminder } from "./healthy-usage-reminder.js";
import { NightRestReminder } from "./night-rest-reminder.js";

const meta: Meta = {
  title: "Domain/Wellbeing",
};

export default meta;

export const NightRest: StoryObj = {
  render: () => <NightRestReminder open onDismiss={() => {}} />,
};

export const HealthyUsage: StoryObj = {
  render: () => (
    <HealthyUsageDialog
      open
      onOpenChange={() => {}}
      loadDeviceSettings={() => ({
        enabled: true,
        minutes: 30,
        forceMotion: false,
        reducedMotion: true,
      })}
      personalization={{
        likedTopics: ["TECNOLOGIA"],
        blockedTopics: [],
        disabledModules: ["EVENTS"],
        nightRestReminder: true,
        liteMode: false,
      }}
      topics={[
        { value: "TECNOLOGIA", label: "Tecnologia" },
        { value: "CARREIRA", label: "Carreira" },
      ]}
      minMinutes={1}
      maxMinutes={240}
      onSave={() => {}}
    />
  ),
};

export const BreakReminder: StoryObj = {
  render: () => <HealthyUsageReminder open onDismiss={() => {}} brandIconUrl="" />,
};
