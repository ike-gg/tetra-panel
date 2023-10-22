import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useAdjustmentStore } from "~/app/store/adjustmentStore";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";

export const FrameRateOption = () => {
  const { setFrameRate, removeFrameRate, frameRate } = useAdjustmentStore(
    (state) => state,
  );

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) removeFrameRate();
  }, [active, removeFrameRate]);

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant={active ? "outline" : "secondary"}
        className="flex items-center gap-2"
        onClick={() => setActive((p) => !p)}
      >
        <DoubleArrowRightIcon /> Frame reduction {frameRate}
      </Button>
      {active && (
        <Slider
          max={5}
          min={1}
          step={0.25}
          defaultValue={[1]}
          onValueCommit={([value]) => setFrameRate(value!)}
        />
      )}
    </div>
  );
};
