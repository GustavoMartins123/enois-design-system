export type SupportMessages = {
  supportForm: {
    attachImage: string;
    attachImageAction: string;
    uploading: string;
    removeImage: string;
    imageUploadError: string;
    subject: string;
    subjectPlaceholder: string;
    category: string;
    categoryHint: string;
    /** Category value (the API enum) and its label, in display order. */
    categories: readonly (readonly [string, string])[];
    apiAccessTemplate: string;
    message: string;
    messagePlaceholder: string;
    contactEmail: string;
    contactEmailHint: string;
    action: string;
    sending: string;
    successTitle: string;
    successDescription: string;
    newRequest: string;
    validationSubject: string;
    validationMessage: string;
    validationEmail: string;
  };
  mySupportRequests: {
    title: string;
    description: string;
    empty: string;
    loading: string;
    status: Record<string, string>;
    adminReplyLabel: string;
  };
  contributionForm: {
    fields: {
      name: string;
      namePlaceholder: string;
      github: string;
      githubPlaceholder: string;
      email: string;
      emailPlaceholder: string;
      area: string;
      areaPlaceholder: string;
      experience: string;
      experiencePlaceholder: string;
      message: string;
      messagePlaceholder: string;
    };
    /** Area value (the API enum) and its label, in display order. */
    areas: readonly (readonly [string, string])[];
    /** Experience value (the API enum) and its label, in display order. */
    experiences: readonly (readonly [string, string])[];
    termsPrefix: string;
    termsLink: string;
    termsSuffix: string;
    submit: string;
    confirm: string;
    sending: string;
    successTitle: string;
    successDescription: string;
    verifiedGithubHint: string;
    verifiedSuccessTitle: string;
    verifiedSuccessDescription: string;
    again: string;
    validationName: string;
    validationGithub: string;
    validationEmail: string;
    validationTerms: string;
  };
  contributorLinkStatus: {
    title: string;
    description: (login: string) => string;
    error: string;
    syncNow: string;
    syncing: string;
    syncFailed: string;
    syncFound: (contributions: number, issues: number) => string;
    syncEmpty: string;
    settingsLink: string;
  };
  verifiedContributorPrompt: {
    title: string;
    description: string;
    action: string;
    close: string;
    formTitle: string;
    formHint: string;
    confirmedTitle: string;
    confirmedDescription: string;
  };
};
