import type { GlobalSearchResultData } from "./global-search-result-data.js";

export type GlobalSearchResultsProps = {
  items: GlobalSearchResultData[];
  query: string;
  isFetching: boolean;
  onSelect: (item: GlobalSearchResultData) => void;
};
