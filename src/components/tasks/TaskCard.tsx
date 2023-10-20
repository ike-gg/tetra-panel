"use client";

/* eslint-disable @next/next/no-img-element */
import { type ManualAdjustment } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { tasks } from "~/constants/routes";
import { useEffect, useMemo } from "react";
import useCountDown from "react-countdown-hook";
import { cn } from "~/lib/utils";
import { TimerIcon } from "@radix-ui/react-icons";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "../ui/context-menu";
import { toast } from "sonner";

interface Props {
  taskDetails: ManualAdjustment;
}

export const TaskCard = ({ taskDetails }: Props) => {
  const { id, guildName, guildIcon, expiresOn, emoteUrl, emoteName } =
    taskDetails;

  const secondsLeft = useMemo(() => {
    const expires = new Date(expiresOn);
    const now = new Date();
    const timeDifference = expires.getTime() - now.getTime();
    return Math.floor(timeDifference);
  }, [expiresOn]);

  const [timeleft, { start }] = useCountDown(secondsLeft, 1000);

  useEffect(() => {
    start();
  }, [start]);

  const timeLeftFormatted = useMemo(() => {
    const seconds = Math.floor(timeleft / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${minutes}:${formattedSeconds}`;
  }, [timeleft]);

  if (timeleft <= 0) return null;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link
          key={id}
          href={tasks.id(id)}
          className={cn(
            "flex min-w-[16rem] items-center gap-3 rounded-lg border border-neutral-200 bg-gradient-to-br from-neutral-50 via-neutral-200/75 to-neutral-100 p-4 shadow-lg hover:border-neutral-400",
            timeleft < 300000 && "animate-pulse",
          )}
        >
          <img
            alt={`emote ${emoteName}`}
            className="h-16 w-16 rounded-md border border-neutral-300 object-contain shadow-xl"
            src={emoteUrl}
          />
          <div className="flex h-full flex-col justify-between gap-1.5">
            <div className="flex items-center gap-1.5 text-xs leading-none text-muted-foreground">
              <Avatar className="h-4 w-4">
                <AvatarImage src={guildIcon ?? ""} />
              </Avatar>
              {guildName}
            </div>
            <p className="font-medium leading-none">{emoteName}</p>
            <code className="flex items-center gap-1 text-xs leading-none text-muted-foreground">
              <TimerIcon /> {timeLeftFormatted}
            </code>
          </div>
        </Link>
        <ContextMenuContent>
          <ContextMenuItem
            onClick={() => {
              toast.error("error!!");
            }}
            className="bg-destructive/10 text-destructive"
          >
            Dismiss
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuTrigger>
    </ContextMenu>
  );
};
