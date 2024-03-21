import { Check, Save } from "lucide-react";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { Spinner } from "~/components/ui/spinner";

interface Props {
  isAddEmoteLoading: boolean;
  isEmoteSaved: boolean;
  handleSaveEmote: () => void;
}

export const EmoteDialogDropdownSaveEmote = ({
  handleSaveEmote,
  isAddEmoteLoading,
  isEmoteSaved,
}: Props) => {
  return (
    <DropdownMenuItem
      disabled={isAddEmoteLoading || isEmoteSaved}
      onSelect={(e) => e.preventDefault()}
      onClick={handleSaveEmote}
      className="gap-2"
    >
      {isEmoteSaved ? (
        <>
          <Check className="size-4" /> Saved
        </>
      ) : (
        <>
          {isAddEmoteLoading ? (
            <Spinner className="size-4 border-neutral-500" />
          ) : (
            <Save className="size-4" />
          )}
          Save
        </>
      )}
    </DropdownMenuItem>
  );
};
