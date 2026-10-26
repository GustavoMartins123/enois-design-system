import type { CommunitiesMessages } from "../../types/messages/communities-messages.js";

export const communitiesMessages: CommunitiesMessages = {
  communityCard: {
    members: (count) => `${count.toLocaleString("pt-BR")} ${count === 1 ? "membro" : "membros"}`,
    participating: "Participando",
    enter: "Entrar",
    ownerLeaveBlocked:
      "Você administra esta comunidade. Transfira a administração para outro membro antes de sair.",
  },
  communityFavoriteButton: { favorite: "Favoritar", unfavorite: "Remover dos favoritos" },
};
