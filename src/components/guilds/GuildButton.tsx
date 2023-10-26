"use client";

import { type PartialGuild } from "discord-oauth2";
import { Button, type ButtonProps } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { routes } from "~/constants/routes";
import { toast } from "sonner";
import { getGuildIcon } from "~/lib/utils";
import Image from "next/image";

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
          toast("Tetra not joined there yet.", {
            action: {
              label: "Invite bot",
              onClick: () => window.open("/invite"),
            },
          })
        }
      >
        <Avatar className="mr-2 h-7 w-7">
          {icon && (
            <AvatarImage asChild src={getGuildIcon(id, icon, { size: 32 })}>
              <Image
                src={getGuildIcon(id, icon, { size: 32 })}
                alt={`icon of ${name} guild`}
                width={32}
                height={32}
              />
            </AvatarImage>
          )}
          <AvatarFallback>{name.at(0)}</AvatarFallback>
        </Avatar>
        {name}
      </Button>
    );
  }

  return (
    <Button {...props} asChild>
      <Link href={routes.guilds.id(id)}>
        <Avatar className="mr-2 h-7 w-7">
          {icon && (
            <AvatarImage asChild src={getGuildIcon(id, icon, { size: 32 })}>
              <Image
                src={getGuildIcon(id, icon, { size: 32 })}
                alt={`icon of ${name} guild`}
                width={32}
                height={32}
              />
            </AvatarImage>
          )}
          <AvatarFallback>{name.at(0)}</AvatarFallback>
        </Avatar>
        {name}
      </Link>
    </Button>
  );
};
