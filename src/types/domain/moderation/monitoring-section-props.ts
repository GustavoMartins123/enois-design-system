import type { MonitoringEventData } from "./monitoring-event-data.js";
import type { MonitoringOverviewData } from "./monitoring-overview-data.js";
import type { MonitoringSupplyData } from "./monitoring-supply-data.js";

export type MonitoringSectionProps = {
  loading: boolean;
  /** `undefined` when it could not be loaded. */
  overview: MonitoringOverviewData | undefined;
  /** The overview is refetching: the refresh icon spins. */
  fetching?: boolean;
  onRefresh: () => void;
  /** Formatted time the snapshot was generated. */
  generatedAtLabel: string;
  /** Coin supply; `undefined` hides the cards (only administrators get it). */
  supply?: MonitoringSupplyData;
  paused: boolean;
  onTogglePaused: () => void;
  /** Levels offered in the level filter. */
  levels: string[];
  level: string;
  onLevelChange: (level: string) => void;
  /** Event types offered in the type filter. */
  types: string[];
  type: string;
  onTypeChange: (type: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
  /** Raw `datetime-local` values. */
  from: string;
  to: string;
  onFromChange: (from: string) => void;
  onToChange: (to: string) => void;
  onLastHour: () => void;
  onClearDates: () => void;
  /** The "only failures" shortcut is active. */
  onlyFailures: boolean;
  onOnlyFailures: () => void;
  /** Some filter is applied: rows come from the search and "load more" is available. */
  filtered: boolean;
  rows: MonitoringEventData[];
  hasNextPage?: boolean;
  fetchingNextPage?: boolean;
  onLoadMore: () => void;
};
