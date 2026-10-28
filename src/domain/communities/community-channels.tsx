import { useState } from "react";

import { Hash, Lock, Plus } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { CommunityChannelsProps } from "../../types/domain/communities/community-channels-props.js";
import { AppLink } from "../../ui/app-link.js";
import { Button } from "../../ui/button.js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog.js";
import { Input } from "../../ui/input.js";
import { Label } from "../../ui/label.js";

/**
 * Canais privados por tema da comunidade.
 *
 * A lista só é pedida quando a pessoa participa (o backend responde 403 para quem não é membro) e
 * o conteúdo de cada canal vive numa rota própria, fora dos feeds.
 */
export function CommunityChannels({
  joined,
  loading,
  channels,
  topics,
  createPending = false,
  onCreate,
}: CommunityChannelsProps) {
  const messages = useMessages().communityChannels;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const create = async () => {
    const failure = await onCreate({ name, topic, description });
    if (failure !== null) {
      setError(failure);
      return;
    }
    setOpen(false);
    setName("");
    setTopic("");
    setDescription("");
    setError(null);
  };

  return (
    <section className="surface-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-base font-medium text-text-strong">
            <Lock className="h-4 w-4 text-primary" />

            <>{messages.title}</>
          </h2>

          <p className="mt-1 text-sm text-text-subtle">
            {joined ? messages.subtitle : messages.locked}
          </p>
        </div>

        {joined && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-auto gap-1.5 rounded-full">
                <Plus className="h-4 w-4" />

                <>{messages.create}</>
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{messages.createTitle}</DialogTitle>
              </DialogHeader>

              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setError(null);
                  if (name.trim().length < 2) {
                    setError(messages.invalidName);
                    return;
                  }
                  void create();
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="channel-name">{messages.name}</Label>

                  <Input
                    id="channel-name"
                    value={name}
                    required
                    maxLength={80}
                    placeholder={messages.namePlaceholder}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="channel-topic">{messages.topic}</Label>

                  <select
                    id="channel-topic"
                    value={topic}
                    onChange={(event) => setTopic(event.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none transition focus:border-primary"
                  >
                    <option value="">{messages.topicNone}</option>

                    {topics.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="channel-description">{messages.description}</Label>

                  <Input
                    id="channel-description"
                    value={description}
                    maxLength={300}
                    placeholder={messages.descriptionPlaceholder}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                    {messages.cancel}
                  </Button>

                  <Button type="submit" disabled={createPending}>
                    {createPending ? messages.creating : messages.confirm}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {joined && (
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {channels.map((channel) => (
            <AppLink
              key={channel.id}
              href={channel.href}
              className="flex min-w-0 items-start gap-2 rounded-xl border border-border-soft px-3 py-2.5 transition hover:border-primary hover:text-primary"
            >
              <Hash className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-text-strong">
                  {channel.name}
                </span>

                <span className="block truncate text-xs text-text-subtle">
                  {channel.topicLabel ?? null}
                  {channel.topicLabel && channel.description ? " · " : null}
                  {channel.description}
                </span>
              </span>
            </AppLink>
          ))}

          {!loading && channels.length === 0 && (
            <p className="text-sm text-text-subtle">{messages.empty}</p>
          )}
        </div>
      )}
    </section>
  );
}
