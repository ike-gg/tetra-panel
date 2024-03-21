import { DimensionsIcon } from "@radix-ui/react-icons";
import { useAdjustmentStore } from "~/app/store/adjustmentStore";
import { Button } from "~/components/ui/button";
import { type FittingOptions } from "~/types";

export const FittingsOption = () => {
  const { setFitting, fitting } = useAdjustmentStore((state) => state);

  const options: FittingOptions[] = ["contain", "cover", "fill"];

  return (
    <div className="flex w-full gap-4">
      {options.map((option, index) => {
        return (
          <Button
            variant={fitting === option ? "outline" : "secondary"}
            className="flex flex-1 items-center gap-2 capitalize"
            key={option + index}
            onClick={() => setFitting(option)}
          >
            <DimensionsIcon /> {option}
          </Button>
        );
      })}
    </div>
  );
};
