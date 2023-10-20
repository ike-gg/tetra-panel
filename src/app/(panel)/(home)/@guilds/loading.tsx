import { Skeleton } from "~/components/ui/skeleton";

export default function LoadingGuildsHomeParallel() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-6 w-32" />
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-56" />
      </div>
      <Skeleton className="h-6 w-32" />
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-16" />
      </div>
    </div>
  );
}
