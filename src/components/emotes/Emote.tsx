/* eslint-disable @next/next/no-img-element */
"use client";

import { type Emotes } from "@prisma/client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu";
import * as Dialog from "../ui/dialog";
import { useEmoteContextStore } from "~/app/store/emoteContextStore";
import { cn } from "~/lib/utils";
import { forwardRef, useState } from "react";
import { api } from "~/trpc/react";
import prettyBytes from "pretty-bytes";
import { motion } from "framer-motion";
import {
  AddToGuildContextMenu,
  OpenInManual,
  RemoveEmoteContextMenu,
} from "./contextmenu";
import { MAX_EMOTE_SIZE } from "~/constants";

type EmoteFlat = Omit<Emotes, "expiresOn" | "accountId" | "id">;
type EmoteProp = EmoteFlat & { animated: boolean };

export type EmoteInterface = EmoteProp & { internalId?: string };

interface Props {
  details: EmoteProp;
  className?: string;
  guildId?: string;
  removeFn?: () => Promise<string>;
}

export const Emote = forwardRef<HTMLDivElement, Props>(
  ({ details, className, guildId, removeFn }, ref) => {
    const { emoteName, emoteUrl, origin, reference, animated } = details;

    const [isDeleted, setIsDeleted] = useState(false);
    const [exceededSize, setExceededSize] = useState(false);

    const {
      data: imageSize,
      refetch,
      isLoading,
    } = api.buffer.getSize.useQuery(emoteUrl, {
      enabled: false,
    });

    const fetchImageSize = async () => {
      if (imageSize) return;
      const { data } = await refetch();
      if (!data) return;
      if (data > MAX_EMOTE_SIZE - 12000) {
        setExceededSize(true);
      }
    };

    const hideEmote = () => setIsDeleted(true);

    const { guilds } = useEmoteContextStore((state) => state);

    if (isDeleted) return null;

    return (
      <motion.div
        layout
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.75, opacity: 0 }}
        ref={ref}
      >
        <ContextMenu onOpenChange={fetchImageSize}>
          <Dialog.Dialog onOpenChange={fetchImageSize}>
            <ContextMenuTrigger asChild>
              <Dialog.DialogTrigger asChild>
                <div
                  className={cn(
                    "flex w-20 cursor-pointer flex-col gap-1 transition-all hover:scale-105",
                    className,
                  )}
                  tabIndex={1}
                >
                  <div className="relative h-20 w-20">
                    <img
                      draggable={false}
                      className="z-50 aspect-square h-full w-full select-none rounded-md border border-neutral-300 object-contain shadow"
                      src={emoteUrl}
                      alt={`emote ${emoteName}`}
                    />
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {emoteName}
                  </p>
                </div>
              </Dialog.DialogTrigger>
            </ContextMenuTrigger>
            <Dialog.DialogContent>
              <Dialog.DialogHeader>{emoteName}</Dialog.DialogHeader>
              {guilds?.map((guild) => guild.name).join(", ")}
              {isLoading && (
                <div className="mr-3 h-16 w-16 animate-spin rounded-full border-[2px] border-neutral-800 border-t-transparent " />
              )}
              <code>{imageSize && prettyBytes(imageSize)}</code>
              <img alt="stfu" src={emoteUrl} />
            </Dialog.DialogContent>
          </Dialog.Dialog>
          <ContextMenuContent>
            <AddToGuildContextMenu emoteName={emoteName} emoteUrl={emoteUrl} />
            {animated && (
              <OpenInManual emoteName={emoteName} emoteUrl={emoteUrl} />
            )}
            {removeFn && (
              <RemoveEmoteContextMenu
                emoteName={emoteName}
                removeFn={removeFn}
                hideEmoteFn={hideEmote}
              />
            )}
            <ContextMenuLabel>
              Size: {prettyBytes(imageSize ?? 0)}
            </ContextMenuLabel>
            <ContextMenuLabel>Emote origin: {origin}</ContextMenuLabel>
            <ContextMenuLabel>
              {animated ? "Animated" : "Static"}
            </ContextMenuLabel>
          </ContextMenuContent>
        </ContextMenu>
      </motion.div>
    );
  },
);

Emote.displayName = "emote block";
