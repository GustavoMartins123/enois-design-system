/** Pod resources (JVM, CPU, memory, disk, database pool). */
export type MonitoringResource = {
  heapUsedBytes: number;
  heapMaxBytes: number;
  nonHeapUsedBytes: number;
  gcCount: number;
  gcTimeMs: number;
  threads: number;
  peakThreads: number;
  loadedClasses: number;
  processCpuPercent: number;
  systemCpuPercent: number;
  loadAverage: number;
  systemMemoryTotalBytes: number;
  systemMemoryFreeBytes: number;
  diskTotalBytes: number;
  diskFreeBytes: number;
  cgroupMemoryUsedBytes: number;
  cgroupMemoryMaxBytes: number;
  cgroupCpuCores: number;
  cgroupCpuPercent: number;
  dbPool: { active: number; max: number; waiting: number } | null;
};
