import { ScissorsIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useAdjustmentStore } from "~/app/store/adjustmentStore";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";

interface Props {
  frames: number;
}

export const CutOption = ({ frames }: Props) => {
  const { setCut, removeCut, cut } = useAdjustmentStore((state) => state);

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) removeCut();
  }, [active, removeCut]);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Button
        variant={active ? "default" : "secondary"}
        className="flex items-center gap-2"
        onClick={() => setActive((p) => !p)}
      >
        <ScissorsIcon /> Cut {cut?.join("-")}
      </Button>
      {active && (
        <Slider
          defaultValue={[0, frames - 1]}
          max={frames - 1}
          min={0}
          step={1}
          minStepsBetweenThumbs={5}
          onValueCommit={([s1, s2]) => setCut([s1!, s2!])}
        />
      )}
    </div>
  );
};
