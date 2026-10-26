import type { Meta, StoryObj } from "@storybook/react-vite";

import { ConversationItem } from "./conversation-item.js";
import { ConversationListSkeletons } from "./conversation-list-skeletons.js";
import { ConversationThread } from "./conversation-thread.js";
import { MessageBubble } from "./message-bubble.js";
import { MessageSkeletons } from "./message-skeletons.js";

const meta: Meta = {
  title: "Domain/Messages",
};

export default meta;

const peer = { name: "Ana Souza", headline: "Designer em São Paulo" };
const emojis = { LIKE: "👍", LOVE: "❤️", HAHA: "😂" };

export const List: StoryObj = {
  render: () => (
    <ul className="max-w-sm">
      <ConversationItem
        conversation={{ lastMessage: "Bora marcar aquele café?", unread: 2 }}
        peer={peer}
        profileHref="#"
        timeLabel="5 min"
        isActive={false}
        onSelect={() => {}}
      />
      <ConversationItem
        conversation={{ title: "Projeto Énóis", lastMessage: "Fechado!", unread: 0 }}
        profileHref="#"
        timeLabel="2 h"
        isActive
        onSelect={() => {}}
      />
    </ul>
  ),
};

export const Thread: StoryObj = {
  render: () => (
    <div className="flex h-[600px] max-w-lg flex-col">
      <ConversationThread
        peer={peer}
        profileHref="#"
        loading={false}
        empty={false}
        newestMessageId="2"
        hasOlderMessages
        loadingOlder={false}
        onLoadOlder={() => {}}
        selecting={false}
        selectedCount={0}
        onStartSelecting={() => {}}
        onCancelSelection={() => {}}
        deletePending={false}
        onDeleteSelected={() => {}}
        sendPending={false}
        onSend={() => Promise.resolve()}
        servicesOpen={false}
        onServicesOpenChange={() => {}}
        servicesLoading={false}
        services={[]}
        serviceHref={(id) => `/servicos#oferta-${id}`}
      >
        <MessageBubble
          message={{ reactions: { LOVE: 1 } }}
          isMe={false}
          peer={peer}
          profileHref="#"
          content={<p>Oi! Vi teu portfólio, curti muito.</p>}
          timeLabel="10 min"
          emojis={emojis}
        />
        <MessageBubble
          message={{ myReaction: "LIKE", reactions: { LIKE: 1 } }}
          isMe
          readByOther
          profileHref="#"
          content={<p>Valeu demais!</p>}
          timeLabel="agora"
          emojis={emojis}
        />
      </ConversationThread>
    </div>
  ),
};

export const Loading: StoryObj = {
  render: () => (
    <div className="max-w-lg space-y-6">
      <ConversationListSkeletons count={3} />
      <MessageSkeletons />
    </div>
  ),
};
