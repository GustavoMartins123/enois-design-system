export type InstallPwaBannerProps = {
  /** The install invite is visible. */
  showBanner: boolean;
  onInstall: () => void;
  onClose: () => void;
  /** The iOS "Add to Home Screen" steps dialog is open. */
  iosStepsOpen: boolean;
  onCloseIosSteps: () => void;
};
