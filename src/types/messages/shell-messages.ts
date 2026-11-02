export type ShellMessages = {
  appBrand: { prefix: string; accent: string };
  authenticatedAppHeader: { openMenu: string };
  guestAppHeader: { enter: string };
  navigationLinks: {
    myCommunities: string;
    favoriteCommunities: string;
    sections: Record<"community" | "work" | "explore", string>;
  };
  contextSwitcher: {
    label: string;
    social: string;
    professional: string;
    socialHint: string;
    professionalHint: string;
    setupProfessional: string;
    switchToSocial: string;
    switchToProfessional: string;
  };
  platformSpacesCard: { title: string; subtitle: string };
};
