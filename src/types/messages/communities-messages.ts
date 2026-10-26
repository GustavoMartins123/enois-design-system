export type CommunitiesMessages = {
  communityCard: {
    members: (count: number) => string;
    participating: string;
    enter: string;
    ownerLeaveBlocked: string;
  };
  communityFavoriteButton: { favorite: string; unfavorite: string };
};
