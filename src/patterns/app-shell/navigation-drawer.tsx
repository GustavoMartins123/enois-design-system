import { useMessages } from "../../messages/messages-context.js";
import type { NavigationDrawerProps } from "../../types/patterns/navigation-drawer-props.js";
import { Sheet, SheetContent, SheetTitle } from "../../ui/sheet.js";

export function NavigationDrawer({ open, onClose, brand, children }: NavigationDrawerProps) {
  const messages = useMessages().navigationDrawer;

  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <SheetContent
        side="left"
        overlayClassName="bg-black/50 backdrop-blur-sm md:hidden"
        className="flex w-72 flex-col border-border-soft bg-surface-card p-0 shadow-card md:hidden [&>button]:right-3 [&>button]:top-2.5 [&>button]:grid [&>button]:h-9 [&>button]:w-9 [&>button]:place-items-center [&>button]:rounded-full [&>button]:text-text-subtle [&>button]:opacity-100 [&>button]:transition [&>button:hover]:bg-surface-2 [&>button:hover]:text-primary sm:[&>button]:top-3.5"
      >
        <SheetTitle className="sr-only">{messages.title}</SheetTitle>

        <div className="flex h-14 items-center border-b border-border-soft px-3 sm:h-16">
          {brand}
        </div>

        {children}
      </SheetContent>
    </Sheet>
  );
}
