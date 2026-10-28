import type { MonitoringCount } from "./monitoring-count.js";
import type { MonitoringMinutePoint } from "./monitoring-minute-point.js";
import type { MonitoringResource } from "./monitoring-resource.js";

/** The monitoring snapshot the backend computes for this pod. */
export type MonitoringOverviewData = {
  uptimeSeconds: number;
  requestsPerSecond: number;
  requestsLastMinute: number;
  inFlight: number;
  peakInFlight: number;
  requestsTotal: number;
  p50Ms: number;
  p95Ms: number;
  p99Ms: number;
  maxMs: number;
  errors4xxLastMinute: number;
  errors5xxLastMinute: number;
  slowLastMinute: number;
  rateLimitedLastMinute: number;
  errorRate: number;
  droppedEvents: number;
  statusCounts: MonitoringCount[];
  methodCounts: MonitoringCount[];
  topRoutes: MonitoringCount[];
  series: MonitoringMinutePoint[];
  jvm: { heapUsedBytes: number; heapMaxBytes: number; processors: number };
  resources: MonitoringResource;
};
