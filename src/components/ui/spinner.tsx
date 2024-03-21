import { cn } from "~/lib/utils";

interface Props {
  className?: string;
}

export const Spinner = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "size-4 animate-spin rounded-full border-[2px] border-neutral-800 !border-t-transparent",
        className,
      )}
    />
  );
};
