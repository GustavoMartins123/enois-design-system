import type { NotificationData } from "./notification-data.js";

export type NotificationItemProps = {
  notification: NotificationData;
  onMarkAsRead: (id: string) => void;
  onAcceptConnection: (actorId: string) => void;
  /**
   * Quem AINDA tem pedido de conexão pendente. O "Aceitar" fica desabilitado quando o pedido já
   * foi aceito — inclusive no Histórico, onde a notificação continua listada.
   */
  stillPendingActorIds?: ReadonlySet<string>;
  /** Pedido sendo aceito agora (desabilita o botão para não clicar duas vezes). */
  acceptingActorId?: string | null;
  /** Opens the notification destination (the app navigates and closes the popover). */
  onOpen: (href: string) => void;
};
