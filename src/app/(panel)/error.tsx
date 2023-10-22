"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "~/components/ui/dialog";
import { routes } from "~/constants/routes";

export default function TaskError({
  error,
}: {
  error: Error & { digset?: string };
}) {
  const router = useRouter();

  return (
    <div className="mx-auto flex h-full max-w-lg flex-col items-end justify-center gap-4">
      <Dialog
        defaultOpen={true}
        onOpenChange={(p) => !p && router.push(routes.panel)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogHeader>Something went wrong</DialogHeader>
            <DialogDescription>{error.message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Go back</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
