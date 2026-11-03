import { type ReactNode, useRef, useState } from "react";

import {
  Camera,
  ChevronDown,
  Code2,
  FileText,
  IdCard,
  ImageIcon,
  MessageSquareText,
  Palette,
  Settings,
  Sparkles,
  UserPen,
} from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { ProfileEditMenuProps } from "../../types/domain/profile/profile-edit-menu-props.js";
import { AppLink } from "../../ui/app-link.js";
import { Button } from "../../ui/button.js";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover.js";
import { ACCOUNT_MENU_ITEM_CLASS } from "../account/account-menu-item-class.js";

const ITEM_CLASS = `${ACCOUNT_MENU_ITEM_CLASS} py-2`;

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="group" aria-label={title} className="rounded-[1.375rem] bg-surface-2/60 p-1">
      <p aria-hidden className="px-3.5 pb-0.5 pt-2 text-xs font-semibold text-text-date">
        {title}
      </p>
      {children}
    </div>
  );
}

function Label({ text, hint }: { text: string; hint: string }) {
  return (
    <span className="flex min-w-0 flex-1 flex-col">
      <span className="truncate">{text}</span>

      <span className="truncate text-[13px] font-normal text-text-subtle">{hint}</span>
    </span>
  );
}

/**
 * Every way to change your own profile behind one "Editar perfil" button: the header keeps one
 * action instead of a wall of nine. Each entry only reports the pick; the app opens the dialog,
 * the file picker or the page.
 */
export function ProfileEditMenu({
  onEditInfo,
  onEditPhoto,
  onEditCover,
  onEditStatus,
  onEditResume,
  onEditBioHtml,
  onEditAppearance,
  onEditLook,
  photoBusy = false,
  coverBusy = false,
  professional,
}: ProfileEditMenuProps) {
  const messages = useMessages().profileEditMenu;
  const [open, setOpen] = useState(false);
  // A pick opens a dialog: focus must stay with it, not go back to the trigger as the menu closes.
  const picked = useRef(false);

  const pick = (action: () => void) => () => {
    picked.current = true;
    setOpen(false);
    action();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 rounded-full">
          <Settings className="h-4 w-4" aria-hidden />
          {messages.trigger}
          <ChevronDown
            aria-hidden
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        onCloseAutoFocus={(event) => {
          if (picked.current) event.preventDefault();
          picked.current = false;
        }}
        className="flex max-h-[min(80dvh,40rem)] w-[min(calc(100vw-1.5rem),21rem)] flex-col gap-2.5 overflow-y-auto overscroll-contain rounded-[1.75rem] border-border-soft bg-surface-card p-2.5 shadow-[var(--shadow-float)]"
      >
        <Group title={messages.groups.profile}>
          <button type="button" onClick={pick(onEditInfo)} className={ITEM_CLASS}>
            <UserPen aria-hidden />
            <Label text={messages.info} hint={messages.infoHint} />
          </button>

          <button
            type="button"
            onClick={pick(onEditPhoto)}
            disabled={photoBusy}
            className={ITEM_CLASS}
          >
            <Camera aria-hidden />
            <Label text={photoBusy ? messages.sending : messages.photo} hint={messages.photoHint} />
          </button>

          <button
            type="button"
            onClick={pick(onEditCover)}
            disabled={coverBusy}
            className={ITEM_CLASS}
          >
            <ImageIcon aria-hidden />
            <Label text={coverBusy ? messages.sending : messages.cover} hint={messages.coverHint} />
          </button>

          <button type="button" onClick={pick(onEditStatus)} className={ITEM_CLASS}>
            <MessageSquareText aria-hidden />
            <Label text={messages.status} hint={messages.statusHint} />
          </button>
        </Group>

        <Group title={messages.groups.career}>
          {professional && (
            <AppLink href={professional.href} onClick={() => setOpen(false)} className={ITEM_CLASS}>
              <IdCard aria-hidden />
              <Label
                text={professional.setup ? messages.professionalSetup : messages.professional}
                hint={messages.professionalHint}
              />
            </AppLink>
          )}

          <button type="button" onClick={pick(onEditResume)} className={ITEM_CLASS}>
            <FileText aria-hidden />
            <Label text={messages.resume} hint={messages.resumeHint} />
          </button>
        </Group>

        <Group title={messages.groups.look}>
          <button type="button" onClick={pick(onEditLook)} className={ITEM_CLASS}>
            <Sparkles aria-hidden />
            <Label text={messages.look} hint={messages.lookHint} />
          </button>

          <button type="button" onClick={pick(onEditBioHtml)} className={ITEM_CLASS}>
            <Code2 aria-hidden />
            <Label text={messages.bioHtml} hint={messages.bioHtmlHint} />
          </button>

          <button type="button" onClick={pick(onEditAppearance)} className={ITEM_CLASS}>
            <Palette aria-hidden />
            <Label text={messages.appearance} hint={messages.appearanceHint} />
          </button>
        </Group>
      </PopoverContent>
    </Popover>
  );
}
