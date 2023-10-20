import { Skeleton } from "~/components/ui/skeleton";

export default function LoadingTasksHomeParallel() {
  return (
    <>
      <Skeleton className="h-6 w-32" />
      <div className="flex gap-4 overflow-x-hidden">
        <Skeleton className="h-24 w-64 border border-neutral-200 shadow-lg" />
        <Skeleton className="h-24 w-80 border border-neutral-200 shadow-lg" />
        <Skeleton className="h-24 w-72 border border-neutral-200 shadow-lg" />
      </div>
    </>
  );
}
