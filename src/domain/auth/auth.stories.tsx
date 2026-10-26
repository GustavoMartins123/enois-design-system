import type { Meta, StoryObj } from "@storybook/react-vite";

import { AuthHero } from "./auth-hero.js";

const meta: Meta = {
  title: "Domain/Auth",
};

export default meta;

export const Hero: StoryObj = {
  render: () => (
    <div className="flex flex-col justify-between gap-10 rounded-2xl bg-primary p-10 text-primary-foreground">
      <AuthHero stats={{ activeUsers: 812, totalUsers: 2275, windowDays: 30 }} />
    </div>
  ),
};
