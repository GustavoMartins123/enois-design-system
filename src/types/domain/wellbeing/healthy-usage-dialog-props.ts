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
  /**
   * BATATA vale na hora: o app aplica o modo e grava a preferência sem esperar o "Salvar".
   * Sem isto o interruptor só valeria depois de salvar, e a tela ficaria com o modo antigo.
   */
  onBatataModeChange?: (on: boolean) => void;
  onSave: (values: HealthyUsageValues) => void;
};
