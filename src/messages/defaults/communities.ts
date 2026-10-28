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
  communityChannels: {
    title: "Canais privados",
    subtitle:
      "Conversas por tema, só para quem participa da comunidade. Nada daqui aparece nos feeds.",
    locked: "Os canais são privados: entre na comunidade para ver e participar.",
    create: "Criar canal",
    createTitle: "Novo canal",
    name: "Nome do canal",
    namePlaceholder: "Ex.: Bastidores, Dúvidas, Vagas",
    topic: "Tema (opcional)",
    topicNone: "Sem tema",
    description: "Descrição (opcional)",
    descriptionPlaceholder: "Para que serve este canal?",
    cancel: "Cancelar",
    confirm: "Criar",
    creating: "Criando...",
    empty: "Nenhum canal ainda. Crie o primeiro.",
    invalidName: "O nome precisa ter pelo menos 2 caracteres.",
  },
};
