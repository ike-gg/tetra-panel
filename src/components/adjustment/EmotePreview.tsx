import prettyBytes from "pretty-bytes";
import { cn } from "~/lib/utils";

/* eslint-disable @next/next/no-img-element */
interface Props {
  base64: string;
  isProcessing?: boolean;
  size: number;
}

export const EmotePreview = ({ base64, size, isProcessing }: Props) => {
  const prettySize = prettyBytes(size);
  return (
    <div className="flex aspect-square flex-col items-center gap-2">
      <img
        alt="emote preview"
        src={base64}
        className={cn(
          "h-full w-full rounded-md border border-neutral-300 object-contain shadow-xl transition-all duration-500 md:h-40 md:w-40",
          isProcessing && "scale-75 opacity-50",
        )}
      />
      <code className="text-xs text-neutral-400">{prettySize}</code>
    </div>
  );
};
