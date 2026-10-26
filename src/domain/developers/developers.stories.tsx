import type { Meta, StoryObj } from "@storybook/react-vite";

import { DeveloperOriginsSection } from "./developer-origins-section.js";

const meta: Meta = {
  title: "Domain/Developers",
};

export default meta;

export const Origins: StoryObj = {
  render: () => (
    <div className="max-w-xl">
      <DeveloperOriginsSection
        authenticated
        loginHref="#"
        loading={false}
        origins={[
          { id: "o1", origin: "https://meuapp.com", blocked: false, blockedReason: null },
          { id: "o2", origin: "https://suspeito.dev", blocked: true, blockedReason: "abuso" },
        ]}
        onAdd={async () => true}
        onRemove={() => {}}
      />
    </div>
  ),
};

export const SignedOut: StoryObj = {
  render: () => (
    <DeveloperOriginsSection
      authenticated={false}
      loginHref="#"
      loading={false}
      origins={[]}
      onAdd={async () => true}
      onRemove={() => {}}
    />
  ),
};
