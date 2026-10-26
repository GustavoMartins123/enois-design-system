import type { EditProfileListItem } from "./edit-profile-list-item.js";
import type { EditProfileSubField } from "./edit-profile-sub-field.js";

export type EditProfileSubListProps = {
  items: EditProfileListItem[];
  fields: EditProfileSubField[];
  currentlyHereKey?: string;
  pending: boolean;
  onCreate: (data: Record<string, unknown>) => Promise<unknown>;
  onUpdate: (id: string, data: Record<string, unknown>) => Promise<unknown>;
  onDelete: (id: string) => void;
  emptyMessage: string;
  newItem: Record<string, string>;
};
