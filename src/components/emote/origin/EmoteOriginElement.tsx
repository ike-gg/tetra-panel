import { type EmoteProp } from "../Emote";
import { SevenTVLogo } from "../../icons/SevenTVLogo";
import { FFZLogo } from "~/components/icons/FFZLogo";
import { BTTVLogo } from "~/components/icons/BTTVLogo";
import { DiscordIcon } from "~/components/icons/DiscordIcon";

interface Props {
  origin: EmoteProp["origin"];
  className?: string;
}

export const EmoteOriginElement = ({ origin, className }: Props) => {
  switch (origin) {
    case "SEVENTV":
      return <SevenTVLogo className={className} />;
    case "FFZ":
      return <FFZLogo className={className} />;
    case "BTTV":
      return <BTTVLogo className={className} />;
    case "DISCORD":
      return <DiscordIcon className={className} />;
  }
};
