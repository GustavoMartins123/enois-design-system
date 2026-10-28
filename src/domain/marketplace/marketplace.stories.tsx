import type { Meta, StoryObj } from "@storybook/react-vite";

import { MarketplaceContentDialog } from "./marketplace-content-dialog.js";
import { MarketplaceSellDialog } from "./marketplace-sell-dialog.js";

const meta: Meta = {
  title: "Domain/Marketplace",
};

export default meta;

const kindOptions = [
  ["TEMPLATE", "Templates"],
  ["BANNER", "Banners"],
  ["SERVICE", "Serviços"],
] as const;

const parsePrice = (text: string) => {
  const value = Number(text.replace(",", "."));
  return Number.isFinite(value) && value > 0 ? Math.round(value * 1_000) : null;
};

export const Sell: StoryObj = {
  render: () => (
    <MarketplaceSellDialog
      open
      onOpenChange={() => {}}
      kindOptions={kindOptions}
      parsePrice={parsePrice}
      onSubmit={() => {}}
    />
  ),
};

export const Content: StoryObj = {
  render: () => (
    <MarketplaceContentDialog
      title="Banner minimalista"
      data={{ title: "Banner minimalista", content: '<section class="banner">Olá</section>' }}
      onClose={() => {}}
    />
  ),
};

export const ContentLoading: StoryObj = {
  render: () => <MarketplaceContentDialog title="Banner minimalista" loading onClose={() => {}} />,
};
