/** Os campos da página empresarial que o painel de edição lê. */
export type CompanyEditData = {
  name: string;
  description: string | null;
  sector: string | null;
  size: string | null;
  location: string | null;
  website: string | null;
  logo: string | null;
  cover: string | null;
};
