import type { Meta, StoryObj } from "@storybook/react-vite";

import { NightRestReminder } from "./night-rest-reminder.js";

const meta: Meta = {
  title: "Domain/Wellbeing",
};

export default meta;

export const NightRest: StoryObj = {
  render: () => <NightRestReminder open onDismiss={() => {}} />,
};
