import type { Messages } from "../types/messages/messages.js";

import { accountMessages } from "./defaults/account.js";
import { authMessages } from "./defaults/auth.js";
import { avatarMessages } from "./defaults/avatar.js";
import { communitiesMessages } from "./defaults/communities.js";
import { editorMessages } from "./defaults/editor.js";
import { legalMessages } from "./defaults/legal.js";
import { notificationsMessages } from "./defaults/notifications.js";
import { patternsMessages } from "./defaults/patterns.js";
import { pwaMessages } from "./defaults/pwa.js";
import { searchMessages } from "./defaults/search.js";
import { shellMessages } from "./defaults/shell.js";
import { supportUsMessages } from "./defaults/support-us.js";
import { uiMessages } from "./defaults/ui.js";
import { wellbeingMessages } from "./defaults/wellbeing.js";

export const defaultMessages: Messages = {
  ...uiMessages,
  ...avatarMessages,
  ...communitiesMessages,
  ...patternsMessages,
  ...shellMessages,
  ...authMessages,
  ...legalMessages,
  ...accountMessages,
  ...notificationsMessages,
  ...searchMessages,
  ...supportUsMessages,
  ...pwaMessages,
  ...wellbeingMessages,
  ...editorMessages,
};
