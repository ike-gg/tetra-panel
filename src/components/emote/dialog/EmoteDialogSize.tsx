import { Info } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { Badge } from "~/components/ui/badge";
import { Spinner } from "~/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface Props {
  isMetadataLoading: boolean;
  exceededSize?: boolean;
  imageSize?: number;
}

export const EmoteDialogSize = ({
  isMetadataLoading,
  exceededSize,
  imageSize,
}: Props) => {
  return (
    <TooltipProvider
      delayDuration={0}
      disableHoverableContent
      skipDelayDuration={0}
    >
      <Badge variant={exceededSize ? "destructive" : "secondary"}>
        <Tooltip>
          {isMetadataLoading && <Spinner className="size-3" />}
          {exceededSize && (
            <TooltipTrigger className="flex">
              <Info className="mr-1 size-4" />
              <TooltipContent className="max-w-96 p-4 text-xs font-normal leading-tight text-neutral-600">
                <p>
                  Emote is too large for direct server upload. It&apos;ll be
                  auto-optimized for Discord&apos;s size limit, which can impact
                  quality.
                </p>
                <p className="mt-2 font-medium">
                  Use &quot;Manual Adjustment&quot; for better restults.
                </p>
              </TooltipContent>
            </TooltipTrigger>
          )}
          {imageSize && prettyBytes(imageSize)}
        </Tooltip>
      </Badge>
    </TooltipProvider>
  );
};
