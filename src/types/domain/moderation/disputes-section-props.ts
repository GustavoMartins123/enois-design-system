import type { DisputeData } from "./dispute-data.js";

export type DisputesSectionProps = {
  loading: boolean;
  disputes: DisputeData[];
  /** A decision is being recorded: both buttons are disabled. */
  pending?: boolean;
  /** The dispute holds: the transfer is reverted. */
  onUphold: (disputeId: string) => void;
  /** The dispute does not hold: whoever disputed is punished. */
  onReject: (disputeId: string) => void;
};
