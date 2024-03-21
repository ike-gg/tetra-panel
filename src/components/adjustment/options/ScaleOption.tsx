import { SizeIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useAdjustmentStore } from "~/store/adjustmentStore";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";

export const ScaleOption = () => {
  const { setScale, removeScale, scale } = useAdjustmentStore((state) => state);

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) removeScale();
  }, [active, removeScale]);

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant={active ? "outline" : "secondary"}
        className="flex items-center gap-2"
        onClick={() => setActive((p) => !p)}
      >
        <SizeIcon /> Scale {scale ? `${scale}%` : ""}
      </Button>
      {active && (
        <Slider
          max={100}
          min={2}
          step={1}
          defaultValue={[100]}
          onValueCommit={([value]) => setScale(value!)}
        />
      )}
    </div>
  );
};
