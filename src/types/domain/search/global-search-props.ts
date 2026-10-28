import type { GlobalSearchResultData } from "./global-search-result-data.js";

export type GlobalSearchProps = {
  /** Results for the last debounced query. */
  results: GlobalSearchResultData[];
  isFetching: boolean;
  /** Called with the debounced query (250 ms); results show from 2 characters on. */
  onQueryChange: (query: string) => void;
  /** The search closes itself; the app navigates. */
  onSelect: (item: GlobalSearchResultData) => void;
};
