import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import type { AccountIdentity } from "../../types/domain/account/account-identity.js";

import { AccountMenu } from "./account-menu.js";
import { AgeGate } from "./age-gate.js";
import { PushToggle } from "./push-toggle.js";

const meta: Meta = {
  title: "Domain/Account",
};

export default meta;

const hrefs = {
  profile: "#",
  corporateProfile: "#",
  wallet: "#",
  marketplace: "#",
  support: "#",
  security: "#",
  blockedUsers: "#",
  myReports: "#",
  sanctions: "#",
  guardian: "#",
  moderator: "#",
  apoie: "#",
};

export const Menu: StoryObj = {
  render: function MenuStory() {
    const [open, setOpen] = useState(true);
    const [identity, setIdentity] = useState<AccountIdentity>("SOCIAL");
    const [push, setPush] = useState(false);

    return (
      <div className="flex justify-end">
        <AccountMenu
          profile={{ name: "Ana Souza", email: "ana@example.com", avatar: null }}
          hrefs={hrefs}
          open={open}
          onOpenChange={setOpen}
          showIdentitySwitch
          corporateIdentityEnabled
          identity={identity}
          onChooseIdentity={setIdentity}
          onChangeEmail={() => {}}
          onChangePassword={() => {}}
          onOpenLinkedAccounts={() => {}}
          onOpenHealthyUsage={() => {}}
          onDeleteAccount={() => {}}
          onLogout={() => {}}
          loggingOut={false}
          pushToggle={
            <PushToggle
              active={push}
              busy={false}
              error={null}
              onToggle={() => setPush((value) => !value)}
            />
          }
        />
      </div>
    );
  },
};

const ageGateBase = {
  open: true,
  onClose: () => {},
  minDate: "1906-01-01",
  maxDate: "2026-10-26",
  error: null,
  declaring: false,
  inviting: false,
  checking: false,
  onSubmitDate: () => {},
  onSubmitInvite: () => {},
  onCheckAgain: () => {},
};

export const AgeGateDate: StoryObj = {
  render: () => <AgeGate {...ageGateBase} mode="date" inviteSentTo={null} />,
};

export const AgeGateParental: StoryObj = {
  render: () => <AgeGate {...ageGateBase} mode="parental" inviteSentTo={null} />,
};

export const AgeGateInviteSent: StoryObj = {
  render: () => <AgeGate {...ageGateBase} mode="parental" inviteSentTo="mae@example.com" />,
};
