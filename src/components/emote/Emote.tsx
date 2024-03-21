/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @next/next/no-img-element */
"use client";

import { type Emotes } from "@prisma/client";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import * as Dialog from "../ui/dialog";
import { cn } from "~/lib/utils";
import { forwardRef, useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { MAX_EMOTE_SIZE } from "~/constants";
import { EmoteDialogContent } from "./dialog/EmoteDialogContent";
import { type FittingOptions } from "~/types";
import { useQuery } from "@tanstack/react-query";
import { getEmoteProviderData } from "~/lib/emotes/getEmoteProviderData";
import { EmoteContextMenu } from "./contextmenu/EmoteContextMenu";
import { useGuildStore } from "~/app/store/guildStore";

export type EmoteFlat = Omit<Emotes, "expiresOn" | "accountId" | "id">;
export type EmoteProp = EmoteFlat & { animated: boolean };

export type EmoteInterface = EmoteProp & { internalId?: string };

interface Props {
  details: EmoteProp;
  className?: string;
  guildId?: string;
  removeFn?: () => Promise<string>;
  hasPermissionsToRemove?: boolean;
}

export const Emote = forwardRef<HTMLDivElement, Props>(
  ({ details, className, removeFn, hasPermissionsToRemove, guildId }, ref) => {
    const { emoteName, emoteUrl, origin, reference } = details;

    const userGuilds = useGuildStore((state) => state.guilds);
    const guildName = userGuilds?.find((guild) => guild.id === guildId)?.name;

    const [isDeleted, setIsDeleted] = useState(false);
    const [exceededSize, setExceededSize] = useState(false);
    const [fitting, setFitting] = useState<FittingOptions>("contain");

    const {
      data: imageMetadata,
      refetch: refetchMetadata,
      isLoading,
    } = api.buffer.getMetadata.useQuery(emoteUrl, {
      enabled: false,
      staleTime: Infinity,
    });

    const {
      data: emoteProviderData,
      refetch: refetchEmoteProviderData,
      isLoading: isEmoteProviderDataLoading,
    } = useQuery({
      queryFn: () => getEmoteProviderData(origin, reference),
      enabled: false,
      staleTime: Infinity,
      queryKey: [reference, origin],
    });

    const fetchEmoteData = () => {
      if (!imageMetadata) refetchMetadata();
      if (!emoteProviderData) refetchEmoteProviderData();
    };

    const { size: imageSize } = imageMetadata ?? {};

    useEffect(() => {
      if (!imageSize) return;
      if (imageSize > MAX_EMOTE_SIZE) setExceededSize(true);
    }, [imageSize]);

    const hideEmote = () => setIsDeleted(true);

    if (isDeleted) return null;

    return (
      <div ref={ref}>
        <ContextMenu onOpenChange={fetchEmoteData}>
          <Dialog.Dialog onOpenChange={fetchEmoteData}>
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
            <EmoteDialogContent
              emote={details}
              isMetadataLoading={isLoading}
              metadata={imageMetadata}
              exceededSize={exceededSize}
              fitting={fitting}
              setFitting={setFitting}
              isEmoteProviderDataLoading={isEmoteProviderDataLoading}
              providerData={emoteProviderData}
            />
          </Dialog.Dialog>
          <EmoteContextMenu
            emote={details}
            handleHideEmote={hideEmote}
            hasPermissionsToRemove={hasPermissionsToRemove}
            isEmoteProviderDataLoading={isEmoteProviderDataLoading}
            isMetadataLoading={isLoading}
            exceededSize={exceededSize}
            metadata={imageMetadata}
            providerData={emoteProviderData}
            removeFn={removeFn}
            guildName={guildName}
          />
        </ContextMenu>
      </div>
    );
  },
);

Emote.displayName = "emote block";
