export type SearchMessages = {
  globalSearch: { action: string; placeholder: string };
  globalSearchResults: { noResults: (query: string) => string };
  userPicker: { empty: string; placeholder: string };
};
