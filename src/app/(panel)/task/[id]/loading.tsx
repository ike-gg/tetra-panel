"use client";

import { useEffect } from "react";
import { useAdjustmentStore } from "~/app/store/adjustmentStore";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

export default function LoadingTask() {
  const reset = useAdjustmentStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="mx-auto max-w-lg space-y-4">
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
