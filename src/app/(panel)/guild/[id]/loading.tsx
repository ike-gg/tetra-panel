import { Skeleton } from "~/components/ui/skeleton";

export default function GuildIdLoading() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 100 }).map((_, i) => (
          <div className="flex flex-col gap-1" key={i}>
            <Skeleton className="h-20 w-20" />
            <Skeleton className="h-4 w-20 rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
