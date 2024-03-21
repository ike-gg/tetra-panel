import { cn } from "~/lib/utils";
import { type EmoteProp } from "./Emote";

interface Props {
  emote: EmoteProp | string;
  className?: string;
}

export const EmoteStatic = ({ emote, className }: Props) => {
  const emoteUrl = typeof emote === "string" ? emote : emote.emoteUrl;
  const isFullEmoteProvided = typeof emote !== "string";

  return (
    <img
      draggable={false}
      className={cn(
        "size-36 rounded-lg border border-neutral-400 object-contain shadow-lg transition-all duration-1000",
        className,
      )}
      alt={
        isFullEmoteProvided
          ? `preview of ${emote.emoteName} emote`
          : "emote preview"
      }
      src={emoteUrl}
    />
  );
};
