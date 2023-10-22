import { TransparencyGridIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useAdjustmentStore } from "~/app/store/adjustmentStore";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";

export const LossyOption = () => {
  const { setLossy, removeLossy, lossy } = useAdjustmentStore((state) => state);

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) removeLossy();
  }, [active, removeLossy]);

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant={active ? "outline" : "secondary"}
        className="flex items-center gap-2"
        onClick={() => setActive((p) => !p)}
      >
        <TransparencyGridIcon /> Lossy {lossy}
      </Button>
      {active && (
        <Slider
          max={200}
          min={0}
          step={1}
          defaultValue={[0]}
          onValueCommit={([value]) => setLossy(value!)}
        />
      )}
    </div>
  );
};
