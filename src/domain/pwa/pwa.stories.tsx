import type { Meta, StoryObj } from "@storybook/react-vite";

import { InstallPwaBanner } from "./install-pwa-banner.js";

const meta: Meta = {
  title: "Domain/Pwa",
};

export default meta;

export const Banner: StoryObj = {
  render: () => (
    <InstallPwaBanner
      showBanner
      onInstall={() => {}}
      onClose={() => {}}
      iosStepsOpen={false}
      onCloseIosSteps={() => {}}
    />
  ),
};

export const IosSteps: StoryObj = {
  render: () => (
    <InstallPwaBanner
      showBanner={false}
      onInstall={() => {}}
      onClose={() => {}}
      iosStepsOpen
      onCloseIosSteps={() => {}}
    />
  ),
};
