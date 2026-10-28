/** `dry` simulates a backfill; `full` re-reads the whole history. */
export type GithubSyncMode = "incremental" | "dry" | "full";
