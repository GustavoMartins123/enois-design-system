import type { ProfileNetworkKind } from "./profile-network-kind.js";
import type { ProfileNetworkPerson } from "./profile-network-person.js";

export type ProfileNetworkDialogProps = {
  name: string;
  kind: ProfileNetworkKind;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  people: ProfileNetworkPerson[] | undefined;
  pending: boolean;
  error: boolean;
};
