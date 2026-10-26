export type LegalMessages = {
  legalLayout: {
    copyright: (year: number) => string;
    about: string;
    terms: string;
    privacy: string;
    guidelines: string;
    disclaimer: string;
  };
  legalLastUpdated: { label: string };
};
