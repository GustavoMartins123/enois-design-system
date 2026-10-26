import type { HealthyUsageDeviceSettings } from "./healthy-usage-device-settings.js";
import type { HealthyUsagePersonalization } from "./healthy-usage-personalization.js";
import type { HealthyUsageTopicOption } from "./healthy-usage-topic-option.js";
import type { HealthyUsageValues } from "./healthy-usage-values.js";

export type HealthyUsageDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Reads the device settings; called every time the dialog opens. */
  loadDeviceSettings: () => HealthyUsageDeviceSettings;
  /** The saved personalization; the fields are seeded when it arrives. */
  personalization?: HealthyUsagePersonalization;
  topics: HealthyUsageTopicOption[];
  minMinutes: number;
  maxMinutes: number;
  savePending?: boolean;
  onSave: (values: HealthyUsageValues) => void;
};
