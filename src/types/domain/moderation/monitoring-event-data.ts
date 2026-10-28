import type { MonitoringEventLevel } from "./monitoring-event-level.js";

/** An application event, failure or log line. */
export type MonitoringEventData = {
  id: string;
  /** Raw timestamp, used in the copied line. */
  createdAt: string;
  /** Formatted time shown in the table. */
  timeLabel: string;
  level: MonitoringEventLevel;
  type: string;
  message: string;
  requestId: string | null;
  method: string | null;
  path: string | null;
  route: string | null;
  status: number | null;
  durationMs: number | null;
  userId: string | null;
  clientIp: string | null;
  metadata: string | null;
};
