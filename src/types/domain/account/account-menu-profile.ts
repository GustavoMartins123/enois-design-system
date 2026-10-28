/** What the account menu shows about the signed-in person. */
export type AccountMenuProfile = {
  name: string;
  email: string;
  avatar: string | null;
  avatarFrame?: string | null;
};
