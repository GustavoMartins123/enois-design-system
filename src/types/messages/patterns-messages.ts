export type PatternsMessages = {
  appSidebar: { expandMenu: string; collapseMenu: string };
  navigationDrawer: { title: string };
  themeToggle: { light: string; dark: string };
  errorBanner: {
    show: string;
    hide: string;
    copied: string;
    copy: string;
    error: (message: string) => string;
    suggestion: (hint: string) => string;
  };
  moduleDisabledView: { title: string; body: string; reenable: string; backToFeed: string };
};
