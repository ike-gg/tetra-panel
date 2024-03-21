import { Check, Clipboard, X } from "lucide-react";
import { useState } from "react";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";

interface Props {
  reference: string;
}

export const EmoteDialogDropdownCopyReference = ({ reference }: Props) => {
  const [success, setSuccess] = useState<boolean | null>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(reference);
      setSuccess(true);
    } catch (_) {
      setSuccess(false);
    }
  };

  return (
    <DropdownMenuItem
      className="gap-2"
      onSelect={async (e) => {
        e.preventDefault();
        await copyToClipboard();
      }}
    >
      {success === true && <Check className="size-4 animate-in zoom-in" />}
      {success === false && <X className="size-4 animate-in zoom-in" />}
      {success === null && <Clipboard className="size-4" />}
      Copy reference
    </DropdownMenuItem>
  );
};
