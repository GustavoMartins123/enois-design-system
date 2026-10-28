export type PushToggleProps = {
  active: boolean;
  busy: boolean;
  error: string | null;
  onToggle: () => void;
};
