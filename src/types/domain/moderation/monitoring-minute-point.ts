/** Per-minute series point of the monitoring charts. */
export type MonitoringMinutePoint = {
  requests: number;
  errors4xx: number;
  errors5xx: number;
  p95Ms: number;
  p99Ms: number;
  maxMs: number;
  cpuPercent: number;
  heapMb: number;
};
