export type MarketplaceMessages = {
  marketplaceContentDialog: {
    fallbackTitle: string;
    description: string;
    loading: string;
    error: string;
    download: string;
    copy: string;
    copied: string;
    copyError: string;
  };
  marketplaceSellDialog: {
    title: string;
    description: string;
    kind: string;
    titleField: string;
    titlePlaceholder: string;
    descriptionField: string;
    serviceContent: string;
    content: string;
    servicePlaceholder: string;
    contentPlaceholder: string;
    price: string;
    minPrice: string;
    publishing: string;
    publish: string;
  };
};
