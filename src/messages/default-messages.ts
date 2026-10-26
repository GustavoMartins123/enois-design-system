import type { Messages } from "../types/messages/messages.js";

import { avatarMessages } from "./defaults/avatar.js";
import { communitiesMessages } from "./defaults/communities.js";
import { uiMessages } from "./defaults/ui.js";

export const defaultMessages: Messages = {
  ...uiMessages,
  ...avatarMessages,
  ...communitiesMessages,
};
