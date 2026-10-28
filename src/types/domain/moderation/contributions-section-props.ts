import type { GithubContributionData } from "./github-contribution-data.js";
import type { GithubRepositoryData } from "./github-repository-data.js";
import type { GithubSyncMode } from "./github-sync-mode.js";
import type { GithubSyncReportData } from "./github-sync-report-data.js";

export type ContributionsSectionProps = {
  /** Status filter: "ALL", "PENDING", "VALIDATED", "REJECTED", "CONTESTED" or "REVOKED". */
  filter: string;
  onFilterChange: (filter: string) => void;
  /** Kind filter: "ALL", "PULL_REQUEST" or "ISSUE". */
  kind: string;
  onKindChange: (kind: string) => void;
  loading: boolean;
  /** The list failed to load. */
  loadError: boolean;
  /** A refetch is running: the refresh icon spins. */
  fetching?: boolean;
  onRefresh: () => void;
  contributions: GithubContributionData[];
  /** A review is being saved: every review button is disabled. */
  reviewPending?: boolean;
  /** Saves the decision with the note typed in that row. */
  onReview: (id: string, status: string, note: string) => void;
  syncPending?: boolean;
  onSync: (mode: GithubSyncMode) => void;
  /** Report of the last sync of this session. */
  report: GithubSyncReportData | null;
  repositories: GithubRepositoryData[];
  repositoryPending?: boolean;
  onToggleRepository: (repository: string, enabled: boolean) => void;
  /** A review, sync or repository change failed. */
  actionError?: boolean;
  /** Message of that failure from the API; falls back to the generic save error. */
  actionErrorMessage?: string | null;
};
