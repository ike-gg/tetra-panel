import { Skeleton } from "~/components/ui/skeleton";

export default function LoadingTasksHomeParallel() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-48" />
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-28 w-28" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-28 w-28" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-28 w-28" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-28 w-28" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
