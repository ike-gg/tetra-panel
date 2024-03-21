import { ColorWheelIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useAdjustmentStore } from "~/store/adjustmentStore";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";

export const ColorsOption = () => {
  const { setColors, removeColors, colors } = useAdjustmentStore(
    (state) => state,
  );

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) removeColors();
  }, [active, removeColors]);

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant={active ? "outline" : "secondary"}
        className="flex items-center gap-2"
        onClick={() => setActive((p) => !p)}
      >
        <ColorWheelIcon /> Colors {colors}
      </Button>
      {active && (
        <Slider
          max={255}
          min={2}
          step={1}
          defaultValue={[255]}
          onValueCommit={([value]) => setColors(value!)}
        />
      )}
    </div>
  );
};
