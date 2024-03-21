import { type ContextGuild } from "~/app/store/guildStore";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { GuildIcon } from "~/components/ui/guildIcon";
import { useUpdateEmote } from "~/hooks/emotes/useUpdateEmote";
import { type EmoteProp } from "../Emote";
import { type FittingOptions } from "~/types";

interface Props extends EmoteProp {
  guild: ContextGuild;
  fitting?: FittingOptions;
}

export const AddToGuildDropdownItem = ({
  guild,
  emoteName,
  emoteUrl,
  fitting,
}: Props) => {
  const { emoteState, isEmoteUploading, updateEmote } = useUpdateEmote();

  const canBeAdded = emoteState !== "uploaded" && isEmoteUploading;

  const handleClick = async () => {
    await updateEmote({
      guildId: guild.id,
      name: emoteName,
      url: emoteUrl,
      fitting,
    });
  };

  return (
    <DropdownMenuItem
      onClick={handleClick}
      className="gap-3"
      disabled={canBeAdded}
    >
      <GuildIcon
        id={guild.id}
        iconId={guild.icon ?? undefined}
        name={guild.name}
        className="h-6 w-6 text-xs"
        options={{ size: 32 }}
      />
      <p>{guild.name}</p>
    </DropdownMenuItem>
  );
};
