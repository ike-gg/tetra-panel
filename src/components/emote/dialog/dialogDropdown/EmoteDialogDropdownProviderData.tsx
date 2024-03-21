import {
  Download,
  ExternalLink,
  FileWarning,
  Share,
  User,
  XCircle,
} from "lucide-react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { Spinner } from "~/components/ui/spinner";
import { type EmoteProviderData } from "~/types/emote";

interface Props {
  providerData?: EmoteProviderData | null;
  isEmoteProviderDataLoading: boolean;
}

export const EmoteDialogDropdownProviderData = ({
  providerData,
  isEmoteProviderDataLoading,
}: Props) => {
  const { fileUrl, isAnimated, url, author } = providerData ?? {};

  const dataNotFound = providerData === null;

  return (
    <DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuLabel className="flex justify-between">
        Provider data
        {isEmoteProviderDataLoading && <Spinner className="size-4" />}
      </DropdownMenuLabel>
      {dataNotFound && (
        <DropdownMenuItem className="gap-2" disabled>
          <XCircle className="size-4" /> No data found
        </DropdownMenuItem>
      )}
      {providerData && (
        <>
          <DropdownMenuItem asChild className="gap-2">
            <a target="_blank" href={url}>
              <ExternalLink className="w-4" />
              Visit emote page
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="gap-2">
            <a download target="_blank" href={fileUrl}>
              <Download className="w-4" />
              Download ({isAnimated ? "GIF" : "PNG"})
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem disabled className="gap-2">
            <User className="w-4" />
            by {author}
          </DropdownMenuItem>
        </>
      )}
    </DropdownMenuGroup>
  );
};
