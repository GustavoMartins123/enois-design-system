import type { UserPickerOption } from "./user-picker-option.js";

export type UserPickerProps = {
  value: string;
  onChange: (username: string) => void;
  placeholder?: string;
  /** Users found for the current query. */
  options: UserPickerOption[];
  isFetching: boolean;
  /** Called on every query change; options show from 2 characters on. */
  onQueryChange: (query: string) => void;
};
