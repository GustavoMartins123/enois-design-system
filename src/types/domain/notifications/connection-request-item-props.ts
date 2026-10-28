import type { ConnectionRequestData } from "./connection-request-data.js";

export type ConnectionRequestItemProps = {
  request: ConnectionRequestData;
  onAccept: (userId: string) => void;
  onReject: (userId: string) => void;
  accepting: boolean;
  rejecting: boolean;
  onNavigate: () => void;
};
