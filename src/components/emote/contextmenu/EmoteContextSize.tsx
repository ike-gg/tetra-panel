import { File, FileWarning } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { ContextMenuItem } from "~/components/ui/context-menu";
import { Spinner } from "~/components/ui/spinner";
import { cn } from "~/lib/utils";

interface Props {
  isMetadataLoading: boolean;
  exceededSize?: boolean;
  imageSize?: number;
}

export const EmoteContextSize = ({
  exceededSize,
  imageSize,
  isMetadataLoading,
}: Props) => {
  return (
    <ContextMenuItem
      className={cn("opacity-50", exceededSize && "text-red-500 !opacity-75")}
      disabled
    >
      {isMetadataLoading && (
        <>
          <Spinner className="size-3" />
          Loading size...
        </>
      )}
      {!isMetadataLoading && imageSize && (
        <>
          {exceededSize ? (
            <FileWarning className="size-4" />
          ) : (
            <File className="size-4" />
          )}
          Size: {prettyBytes(imageSize ?? 0)}
        </>
      )}
    </ContextMenuItem>
  );
};
