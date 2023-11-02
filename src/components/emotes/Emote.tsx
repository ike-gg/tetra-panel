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
import { useEmoteContextStore } from "~/app/store/emoteContextStore";
import { cn, getGuildIcon } from "~/lib/utils";
import { toast } from "sonner";
import { endpoints } from "~/constants/apiroutes";
import { useState } from "react";
import Image from "next/image";

type EmoteProp = Omit<Omit<Omit<Emotes, "expiresOn">, "accountId">, "id">;

interface Props {
  details: EmoteProp;
  className?: string;
  guildId?: string;
}

export const Emote = ({ details, className, guildId }: Props) => {
  const { emoteName, emoteUrl, origin, reference } = details;

  const [isDeleted, setIsDeleted] = useState(false);
  const { guilds } = useEmoteContextStore((state) => state);

  const deleteEmote = async () => {
    if (!guildId) throw { error: "Missing guild id." };
    try {
      const request = await fetch(
        endpoints.removeEmoteFromGuild(reference, guildId),
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const response = (await request.json()) as {
        message: string;
        error: string;
      };

      if (!request.ok) {
        throw response;
      }

      setIsDeleted(true);
      return response;
    } catch (e) {
      throw e;
    }
  };

  const addEmote = async (guildId: string) => {
    try {
      const body = {
        emoteName,
        emoteUrl,
      };
      const request = await fetch(endpoints.addEmoteToGuild(guildId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const response = (await request.json()) as {
        message: string;
        error: string;
      };

      if (!request.ok) {
        throw response;
      }

      return response;
    } catch (e) {
      throw e;
    }
  };

  if (isDeleted) return null;

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className={cn("flex flex-col gap-1", className)}>
          <img
            draggable={false}
            className="aspect-square w-full select-none rounded-md border border-neutral-300 object-contain shadow-md"
            src={emoteUrl}
            alt={`emote ${emoteName}`}
          />
          <p className="truncate text-xs text-muted-foreground">{emoteName}</p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {guilds && (
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to server</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              {guilds.map((guild) => (
                <ContextMenuItem
                  onClick={() => {
                    toast.promise(addEmote(guild.id), {
                      loading: "Submitting your emote...",
                      success: (data) => data.message,
                      error: (data: { error: string }) => {
                        console.log(JSON.stringify(data));
                        return data.error;
                      },
                    });
                  }}
                  key={guild.id}
                  className="min-w-[10rem] justify-between"
                >
                  {guild.name}
                  {guild.icon && (
                    <Image
                      src={getGuildIcon(guild.id, guild.icon, { size: 16 })}
                      alt="guild icon for"
                      className="ml-3 h-5 w-5 rounded-full"
                      width={16}
                      height={16}
                    />
                  )}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
        )}
        {guildId && guilds && guilds.some((g) => g.id === guildId) && (
          <ContextMenuItem
            onClick={() => {
              toast.promise(deleteEmote(), {
                loading: `Removing ${emoteName} emote...`,
                success: (data) => data.message,
                error: (data: { error: string }) => data.error,
              });
            }}
            className="bg-destructive-foreground text-destructive"
          >
            Delete
          </ContextMenuItem>
        )}
        <ContextMenuLabel>Emote origin: {origin}</ContextMenuLabel>
      </ContextMenuContent>
    </ContextMenu>
  );
};
