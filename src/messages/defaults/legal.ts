import type { LegalMessages } from "../../types/messages/legal-messages.js";

export const legalMessages: LegalMessages = {
  legalLayout: {
    copyright: (year) => `© ${year} Énóis · Rede humana gratuita`,
    about: "Sobre o énóis",
    terms: "Termos de Uso",
    privacy: "Política de Privacidade",
    guidelines: "Diretrizes da Comunidade",
    disclaimer:
      "O énóis é um projeto independente, comunitário e sem fins lucrativos, desenvolvido com o objetivo de promover conexões e interações entre pessoas. Não possuímos vínculo, afiliação ou associação com outras organizações ou marcas de nome semelhante, salvo quando expressamente informado.",
  },
  legalLastUpdated: { label: "Última atualização: " },
};
