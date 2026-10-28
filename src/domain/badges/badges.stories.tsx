import type { Meta, StoryObj } from "@storybook/react-vite";

import { UserBadges } from "./user-badges.js";

const meta: Meta = {
  title: "Domain/Badges",
};

export default meta;

const badge =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8' fill='%236746f5'/></svg>";

export const Badges: StoryObj = {
  render: () => (
    <p className="inline-flex items-center gap-1 text-sm">
      Ana Souza
      <UserBadges badges={[badge, badge, badge]} />
    </p>
  ),
};
