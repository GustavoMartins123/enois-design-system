import type { Meta, StoryObj } from "@storybook/react-vite";

import { ToastProvider } from "../../ui/toast.js";

import { ApoieBanner } from "./apoie-banner.js";
import { ApoieCard } from "./apoie-card.js";

const meta: Meta = {
  title: "Domain/Support us",
  decorators: [(Story) => <ToastProvider>{Story()}</ToastProvider>],
};

export default meta;

export const Banner: StoryObj = {
  render: () => <ApoieBanner />,
};

export const Card: StoryObj = {
  render: () => (
    <div className="max-w-xs">
      <ApoieCard />
    </div>
  ),
};
