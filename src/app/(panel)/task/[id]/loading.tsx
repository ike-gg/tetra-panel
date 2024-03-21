"use client";

import { useEffect } from "react";
import { useAdjustmentStore } from "~/app/store/adjustmentStore";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { Spinner } from "~/components/ui/spinner";
import { cn } from "~/lib/utils";

export default function LoadingTask() {
  const reset = useAdjustmentStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="relative mx-auto max-w-lg space-y-4">
      <div
        className={cn(
          "z-50 flex flex-col items-center justify-center gap-2 rounded-lg bg-neutral-50 p-4 py-6 shadow-xl shadow-neutral-300",
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        )}
      >
        <Spinner className="size-4" />{" "}
        <p className="text-sm text-neutral-400">Downloading emote...</p>
      </div>
      <Skeleton className="h-[250px] w-full" />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Separator className="col-span-2" />
        <Skeleton className="h-10 w-full" />
        <Separator className="col-span-2" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Separator className="col-span-2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-[158px] w-full" />
      </div>
    </div>
  );
}
