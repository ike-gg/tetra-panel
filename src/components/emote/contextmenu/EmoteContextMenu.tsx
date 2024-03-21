import { type Metadata } from "sharp";
import { type EmoteProviderData } from "~/types/emote";
import { type EmoteProp } from "../Emote";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
} from "~/components/ui/context-menu";
import { EmoteContextAddToGuild } from "./EmoteContextAddToGuild";
import { EmoteContextOpenInManual } from "./EmoteContextOpenInManual";
import { EmoteContextRemove } from "./EmoteContextRemove";
import prettyBytes from "pretty-bytes";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "~/components/ui/spinner";
import { File, FileWarning, SignalZero } from "lucide-react";
import { cn } from "~/lib/utils";
import { EmoteContextSize } from "./EmoteContextSize";
import { EmoteContextProviderData } from "./EmoteContextProviderData";

interface Props {
  providerData?: EmoteProviderData | null;
  isEmoteProviderDataLoading: boolean;
  isMetadataLoading: boolean;
  metadata?: Metadata;
  exceededSize?: boolean;
  emote: EmoteProp;
  hasPermissionsToRemove?: boolean;
  removeFn?: () => Promise<string>;
  handleHideEmote: () => void;
  guildName?: string;
}

export const EmoteContextMenu = ({
  emote,
  isEmoteProviderDataLoading,
  isMetadataLoading,
  exceededSize,
  metadata,
  guildName,
  providerData,
  hasPermissionsToRemove,
  removeFn,
  handleHideEmote,
}: Props) => {
  const { emoteName, emoteUrl, animated } = emote;
  const { size: imageSize } = metadata ?? {};
  return (
    <ContextMenuContent className="min-w-48">
      <EmoteContextAddToGuild
        exceededSize={exceededSize}
        emoteName={emoteName}
        emoteUrl={emoteUrl}
      />
      {animated && (
        <EmoteContextOpenInManual emoteName={emoteName} emoteUrl={emoteUrl} />
      )}
      {hasPermissionsToRemove && removeFn && (
        <EmoteContextRemove
          emoteName={emoteName}
          removeFn={removeFn}
          hideEmoteFn={handleHideEmote}
          guildName={guildName}
        />
      )}
      <EmoteContextSize
        exceededSize={exceededSize}
        imageSize={imageSize}
        isMetadataLoading={isMetadataLoading}
      />
      <EmoteContextProviderData
        isEmoteProviderDataLoading={isEmoteProviderDataLoading}
        origin={emote.origin}
        providerData={providerData}
      />
    </ContextMenuContent>
  );
};
