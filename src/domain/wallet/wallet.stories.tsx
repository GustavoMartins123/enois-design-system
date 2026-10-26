import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import type { FrameShopOrder } from "../../types/domain/wallet/frame-shop-order.js";

import { FrameShop } from "./frame-shop.js";

const meta: Meta = {
  title: "Domain/Wallet",
};

export default meta;

const items = ["ambar", "esmeralda", "violeta", "aurora", "pulsar", "solar"].map((name, index) => ({
  id: `moldura-${name}`,
  name,
  description: "Moldura de demonstração",
  priceLabel: "2",
  owned: index % 2 === 0,
  equipped: index === 0,
}));

const user = { name: "Ana Souza", username: "ana", headline: "Dev front-end" };

export const Shop: StoryObj = {
  render: function ShopStory() {
    const [order, setOrder] = useState<FrameShopOrder>("oldest");
    return (
      <FrameShop
        items={items}
        user={user}
        order={order}
        onOrderChange={setOrder}
        onRetry={() => {}}
        onBuy={() => {}}
        onEquip={() => {}}
      />
    );
  },
};

export const Owned: StoryObj = {
  render: () => (
    <FrameShop
      onlyOwned
      items={items}
      user={user}
      order="oldest"
      onOrderChange={() => {}}
      onRetry={() => {}}
      onBuy={() => {}}
      onEquip={() => {}}
    />
  ),
};

export const Error: StoryObj = {
  render: () => (
    <FrameShop
      error
      order="oldest"
      onOrderChange={() => {}}
      onRetry={() => {}}
      onBuy={() => {}}
      onEquip={() => {}}
    />
  ),
};
