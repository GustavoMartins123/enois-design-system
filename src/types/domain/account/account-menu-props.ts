import type { ReactNode } from "react";

import type { AccountIdentity } from "./account-identity.js";
import type { AccountMenuHrefs } from "./account-menu-hrefs.js";
import type { AccountMenuProfile } from "./account-menu-profile.js";

export type AccountMenuProps = {
  profile: AccountMenuProfile;
  hrefs: AccountMenuHrefs;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Identity switch: shown only when the account has a professional profile. */
  showIdentitySwitch: boolean;
  /** The professional identity can be chosen (its profile is active). */
  corporateIdentityEnabled: boolean;
  identity: AccountIdentity;
  onChooseIdentity: (identity: AccountIdentity) => void;
  onChangeEmail: () => void;
  onChangePassword: () => void;
  onOpenLinkedAccounts: () => void;
  onOpenHealthyUsage: () => void;
  onDeleteAccount: () => void;
  onLogout: () => void;
  loggingOut: boolean;
  /** Push notifications item slot. */
  pushToggle?: ReactNode;
};
