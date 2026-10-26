import type { Messages } from "../types/messages/messages.js";

import { accountMessages } from "./defaults/account.js";
import { appearanceMessages } from "./defaults/appearance.js";
import { authMessages } from "./defaults/auth.js";
import { avatarMessages } from "./defaults/avatar.js";
import { communitiesMessages } from "./defaults/communities.js";
import { editorMessages } from "./defaults/editor.js";
import { gamesMessages } from "./defaults/games.js";
import { legalMessages } from "./defaults/legal.js";
import { notificationsMessages } from "./defaults/notifications.js";
import { patternsMessages } from "./defaults/patterns.js";
import { postMessages } from "./defaults/post.js";
import { profileMessages } from "./defaults/profile.js";
import { pwaMessages } from "./defaults/pwa.js";
import { searchMessages } from "./defaults/search.js";
import { shellMessages } from "./defaults/shell.js";
import { supportUsMessages } from "./defaults/support-us.js";
import { uiMessages } from "./defaults/ui.js";
import { walletMessages } from "./defaults/wallet.js";
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
  ...postMessages,
  ...gamesMessages,
  ...appearanceMessages,
  ...walletMessages,
  ...profileMessages,
};
