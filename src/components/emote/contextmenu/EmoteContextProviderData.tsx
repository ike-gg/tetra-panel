import {
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
} from "~/components/ui/context-menu";
import { type EmoteOrigin, type EmoteProviderData } from "~/types/emote";
import { EmoteOriginElement } from "../origin/EmoteOriginElement";
import { Download, ExternalLink, User } from "lucide-react";
import { Spinner } from "~/components/ui/spinner";

interface Props {
  providerData?: EmoteProviderData | null;
  isEmoteProviderDataLoading: boolean;
  origin: EmoteOrigin;
}

export const EmoteContextProviderData = ({
  isEmoteProviderDataLoading,
  origin,
  providerData,
}: Props) => {
  const { fileUrl, url, author, isAnimated } = providerData ?? {};
  return (
    <ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuItem disabled>
        {isEmoteProviderDataLoading && (
          <Spinner className="size-3 fill-neutral-400" />
        )}
        {!isEmoteProviderDataLoading && (
          <EmoteOriginElement
            className="size-4 fill-neutral-400"
            origin={origin}
          />
        )}
        {isEmoteProviderDataLoading && <span>Fetching emote data...</span>}
        {!isEmoteProviderDataLoading && providerData && (
          <span>Provider data</span>
        )}
        {!isEmoteProviderDataLoading && !providerData && (
          <span>Data not available</span>
        )}
      </ContextMenuItem>
      {providerData && (
        <>
          <ContextMenuItem asChild className="gap-2">
            <a target="_blank" href={url}>
              <ExternalLink className="w-4" />
              Visit emote page
            </a>
          </ContextMenuItem>
          <ContextMenuItem asChild className="gap-2">
            <a download target="_blank" href={fileUrl}>
              <Download className="w-4" />
              Download ({isAnimated ? "GIF" : "PNG"})
            </a>
          </ContextMenuItem>
          <ContextMenuItem disabled className="gap-2">
            <User className="w-4" />
            by {author}
          </ContextMenuItem>
        </>
      )}
    </ContextMenuGroup>
  );
};
