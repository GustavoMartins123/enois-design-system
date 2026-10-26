import type { DevelopersMessages } from "../../types/messages/developers-messages.js";

export const developersMessages: DevelopersMessages = {
  developerOriginsSection: {
    login: "Entre na sua conta para cadastrar a origem do seu app.",
    enter: "Entrar",
    blocked: "Bloqueada por atividade suspeita",
    placeholder: "https://meuapp.com",
    add: "Cadastrar origem",
    empty: "Nenhuma origem cadastrada ainda.",
    remove: "Remover",
    validHint:
      "Use só o domínio com https (http é aceito apenas em localhost). Sem origem cadastrada, a requisição recebe 403 ORIGIN_NOT_ALLOWED (e ORIGIN_REQUIRED quando a chamada não manda origem nenhuma).",
  },
};
