import type { AuthMessages } from "../../types/messages/auth-messages.js";

export const authMessages: AuthMessages = {
  authHero: {
    eyebrow: "Networking com propósito",
    // A frase e a TESE do produto (a mesma da landing), nao um depoimento: antes era uma
    // citacao atribuida a uma pessoa que nao existe, com o nome de uma empresa real.
    quote: '"Uma rede social não precisa viver da sua atenção."',
    // Numeros REAIS: vem de /stats/community (publico, cache de ~10 min no servidor). Antes
    // eram fixos no texto ("120k+ profissionais", "2.8k mentores", "640 comunidades") — a rede
    // tem 2.275 contas, entao o painel afirmava um numero que o produto nao tem. A landing ja
    // usava o contador de verdade; aqui era o unico lugar que ainda mentia.
    stats: (activeUsers, totalUsers, windowDays) => [
      {
        value: activeUsers.toLocaleString("pt-BR"),
        label: `ativos nos últimos ${windowDays} dias`,
      },
      { value: totalUsers.toLocaleString("pt-BR"), label: "contas na plataforma" },
    ],
  },
};
