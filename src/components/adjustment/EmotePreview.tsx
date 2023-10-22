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
    <div className="flex flex-col items-center gap-2">
      <img
        alt="emote preview"
        src={base64}
        className={cn(
          "h-40 w-40 rounded-md border border-neutral-300 object-contain shadow-xl transition-all duration-500",
          isProcessing && "scale-75 opacity-50",
        )}
      />
      <code className="text-xs text-neutral-400">{prettySize}</code>
    </div>
  );
};
