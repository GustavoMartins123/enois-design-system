export type ChangePasswordValues = {
  /** Vazio quando a conta ainda não tem senha (login social). */
  currentPassword: string;
  newPassword: string;
};
