import { type GetIconOptions, cn, getGuildIcon } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface Props {
  id: string;
  name: string;
  iconId?: string;
  className?: string;
  options?: GetIconOptions;
}

export const GuildIcon = ({ className, iconId, id, name, options }: Props) => {
  return (
    <Avatar className={cn("size-8 shadow-md shadow-neutral-500/10", className)}>
      {iconId && (
        <AvatarImage
          alt={`guild icon for ${name} guild`}
          src={getGuildIcon(id, iconId, options)}
        />
      )}
      <AvatarFallback>{name.slice(0, 1).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
