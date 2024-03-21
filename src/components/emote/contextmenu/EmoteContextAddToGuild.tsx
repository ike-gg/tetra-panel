import { useGuildStore } from "~/app/store/guildStore";
import {
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuItem,
} from "~/components/ui/context-menu";
import { cn, getGuildIcon } from "~/lib/utils";
import { Plus } from "lucide-react";
import { useUploadEmote } from "~/hooks/emotes/useUpdateEmote";

interface Props {
  emoteUrl: string;
  emoteName: string;
  exceededSize?: boolean;
}

export const EmoteContextAddToGuild = ({
  emoteName,
  emoteUrl,
  exceededSize,
}: Props) => {
  const guilds = useGuildStore((state) => state.guilds);

  const addDisabled = !guilds || guilds.length === 0;

  const { updateEmote } = useUploadEmote();

  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger
        disabled={addDisabled}
        className={cn(addDisabled && "opacity-50")}
      >
        <Plus className="size-4" />{" "}
        {exceededSize ? "Add optimized to server" : "Add to server"}
      </ContextMenuSubTrigger>
      {guilds && (
        <ContextMenuSubContent>
          {guilds.map((guild) => (
            <ContextMenuItem
              onClick={() =>
                updateEmote({
                  guildId: guild.id,
                  name: emoteName,
                  url: emoteUrl,
                })
              }
              key={guild.id}
              className="min-w-[10rem] justify-between"
            >
              {guild.name}
              {guild.icon && (
                <img
                  src={getGuildIcon(guild.id, guild.icon, { size: 16 })}
                  alt="guild icon for"
                  className="ml-3 h-5 w-5 rounded-full"
                />
              )}
            </ContextMenuItem>
          ))}
        </ContextMenuSubContent>
      )}
    </ContextMenuSub>
  );
};
