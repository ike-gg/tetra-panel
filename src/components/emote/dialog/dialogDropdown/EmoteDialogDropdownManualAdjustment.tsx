import { Pencil } from "lucide-react";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { Spinner } from "~/components/ui/spinner";

interface Props {
  isManualAdjustmentLoading: boolean;
  handleManualAdjustment: () => void;
}

export const EmoteDialogDropdownManualAdjustment = ({
  handleManualAdjustment,
  isManualAdjustmentLoading,
}: Props) => {
  return (
    <DropdownMenuItem
      disabled={isManualAdjustmentLoading}
      onSelect={(e) => e.preventDefault()}
      onClick={handleManualAdjustment}
      className="gap-2"
    >
      <>
        {isManualAdjustmentLoading ? (
          <Spinner className="size-4 border-neutral-500" />
        ) : (
          <Pencil className="size-4" />
        )}
        Manual Adjustment
      </>
    </DropdownMenuItem>
  );
};
