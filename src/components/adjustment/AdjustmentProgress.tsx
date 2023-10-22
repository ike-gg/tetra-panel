import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import prettyBytes from "pretty-bytes";

interface Props {
  currentSize: number;
  maxSize: number;
}

export const AdjustmentProgress = ({ currentSize, maxSize }: Props) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const prettySize = prettyBytes(currentSize);
    if (currentSize >= maxSize) {
      const difference = prettyBytes(currentSize - maxSize);
      setText(`Emote exceedes limit by ${difference}`);
    } else {
      setText(`Current size: ${prettySize}, ready to go!`);
    }
  }, [currentSize, maxSize]);

  return (
    <div>
      <p className="mb-2 text-center text-xs text-muted-foreground">{text}</p>
      <Progress
        className="flex h-2 bg-neutral-200"
        value={Math.min((currentSize / maxSize) * 100, 100)}
        max={1}
      />
    </div>
  );
};
