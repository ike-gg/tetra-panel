"use client";

import { type PartialGuild } from "discord-oauth2";
import { Button, type ButtonProps } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { guilds } from "~/constants/routes";
import { toast } from "sonner";

interface Props extends ButtonProps {
  guild: PartialGuild;
  asInvite?: boolean;
}

export const GuildButton = ({ guild, asInvite = false, ...props }: Props) => {
  const { icon, name, id } = guild;

  if (asInvite) {
    return (
      <Button
        {...props}
        onClick={() =>
          toast.error("Tetra not joined here yet.", {
            action: {
              label: "Invite bot",
              onClick: () => window.open("/invite"),
            },
          })
        }
      >
        <Avatar className="mr-2 h-7 w-7">
          <AvatarImage
            src={`https://cdn.discordapp.com/icons/${id}/${icon}.png`}
          />
          <AvatarFallback>{name.at(0)}</AvatarFallback>
        </Avatar>
        {name}
      </Button>
    );
  }

  return (
    <Button {...props} asChild>
      <Link href={guilds.id(id)}>
        <Avatar className="mr-2 h-7 w-7">
          <AvatarImage
            src={`https://cdn.discordapp.com/icons/${id}/${icon}.png`}
          />
          <AvatarFallback>{name.at(0)}</AvatarFallback>
        </Avatar>
        {name}
      </Link>
    </Button>
  );
};
