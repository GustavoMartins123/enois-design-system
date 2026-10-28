import type { SearchMessages } from "../../types/messages/search-messages.js";

export const searchMessages: SearchMessages = {
  globalSearch: {
    action: "Buscar",
    placeholder: "Buscar pessoas, comunidades, vagas...",
  },
  globalSearchResults: { noResults: (query) => `Nenhum resultado para "${query}"` },
  userPicker: { empty: "Ninguém com esse nome aqui.", placeholder: "username" },
};
