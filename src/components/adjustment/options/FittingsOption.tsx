import {
  type FittingOption,
  useAdjustmentStore,
} from "~/app/store/adjustmentStore";
import { Button } from "~/components/ui/button";

export const FittingsOption = () => {
  const { setFitting, fitting } = useAdjustmentStore((state) => state);

  const options: FittingOption[] = ["contain", "cover", "fill"];

  return (
    <div className="flex w-full gap-4">
      {options.map((option, index) => {
        return (
          <Button
            variant={fitting === option ? "default" : "secondary"}
            className="flex flex-1 items-center gap-2 capitalize"
            key={option + index}
            onClick={() => setFitting(option)}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
};
