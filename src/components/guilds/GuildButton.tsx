import { type PartialGuild } from "discord-oauth2";
import { Button, type ButtonProps } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { guilds } from "~/constants/routes";

interface Props extends ButtonProps {
  guild: PartialGuild;
}

export const GuildButton = ({ guild, ...props }: Props) => {
  const { icon, name, id } = guild;
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
