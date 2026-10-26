import type { AccountMessages } from "../../types/messages/account-messages.js";

export const accountMessages: AccountMessages = {
  accountMenu: {
    trigger: "Menu da conta",
    triggerLabel: "Perfil",
    profile: "Ver perfil",
    identity: "Identidade",
    socialIdentity: "Social",
    corporateIdentity: "Profissional",
    corporateProfile: "Perfil profissional",
    wallet: "Carteira",
    marketplace: "Marketplace",
    changeEmail: "Alterar e-mail",
    changePassword: "Trocar senha",
    support: "Ajuda e suporte",
    blockedUsers: "Usuários bloqueados",
    myReports: "Minhas denúncias",
    moderator: "Painel de moderador",
    sanctions: "Penalidades",
    linkedAccounts: "Contas vinculadas",
    healthyUsage: "Uso saudável",
    guardian: "Supervisão parental",
    security: "Segurança e verificação",
    apoie: "Apoie o Énóis",
    deleteAccount: "Excluir conta",
    logout: "Sair",
    loggingOut: "Saindo...",
  },
  pushToggle: {
    on: "Notificações no celular ativadas",
    off: "Ativar notificações no celular",
    working: "Ativando...",
  },
  ageGate: {
    title: "Confirme sua data de nascimento",
    description:
      "A plataforma exige a data de nascimento para publicar, comentar e enviar mensagens. Ela fica guardada com a sua conta e não aparece para outras pessoas.",
    label: "Data de nascimento",
    confirm: "Confirmar e continuar",
    later: "Agora não",
    invalid: "Confira a data: ela não pode estar no futuro.",
    parental: {
      title: "Conta de adolescente protegida",
      description:
        "Sua conta é de menor de 18 anos. Para publicar, comentar e enviar mensagens, um responsável legal precisa autorizar o uso da rede.",
      howItWorks:
        "Envie o convite para o e-mail do seu responsável. Ele precisa entrar no Énóis com uma conta de adulto e aceitar o convite. Até lá, a conta fica somente leitura.",
      emailLabel: "E-mail do responsável",
      invite: "Enviar convite",
      inviting: "Enviando...",
      sentFor: (email) => `Convite enviado para ${email}.`,
      waiting:
        "Quando o responsável aceitar, a conta é liberada. Se ele já aceitou, verifique de novo.",
      checkAgain: "Verificar de novo",
      checking: "Verificando...",
      later: "Agora não",
      invalidEmail: "Informe um e-mail válido.",
    },
  },
};
