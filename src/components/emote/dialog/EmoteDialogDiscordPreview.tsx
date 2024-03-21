import { DiscordIcon } from "~/components/icons/DiscordIcon";
import { type EmoteProp } from "../Emote";
import { cn } from "~/lib/utils";

interface Props {
  emote: EmoteProp | { emoteName: string; emoteUrl: string };
  fittingImageClass?: string;
  className?: string;
}

export const EmoteDialogDiscordPreview = ({
  emote,
  fittingImageClass,
  className,
}: Props) => {
  const { emoteName, emoteUrl } = emote;
  return (
    <div
      className={cn(
        "relative flex w-full flex-1 gap-2 rounded-lg bg-discord-bg p-3 font-discord text-discord-text",
        className,
      )}
    >
      <div className="absolute bottom-0 right-0 m-2 rounded-md bg-discord-text/35 px-2 py-0.5 font-discord text-[0.625rem] text-white">
        DISCORD PREVIEW
      </div>
      <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-gradient-to-br from-tetra-300 to-tetra-900">
        <DiscordIcon className="size-6" />
      </div>
      <div className="flex-0 flex flex-col gap-0.5 leading-tight">
        <div className="flex items-end gap-2">
          <h3 className="text-tetra-100">User</h3>
          <p className="text-xs text-discord-text/50">Today at 2:06 AM</p>
        </div>
        <p>
          Inline{" "}
          <img
            className={cn("inline size-[22px]", fittingImageClass)}
            src={emoteUrl}
            alt={`emote preview on message inline ${emoteName}`}
          />{" "}
          emote
        </p>
        <p>Full emote preview:</p>
        <p>
          <img
            className={cn("inline size-12 object-contain", fittingImageClass)}
            src={emoteUrl}
            alt={`emote preview on message inline ${emoteName}`}
          />{" "}
        </p>
      </div>
    </div>
  );
};
