import { toast } from "sonner";
import { ContextMenuItem } from "~/components/ui/context-menu";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { api } from "~/trpc/react";
import { TRPCClientError } from "@trpc/client";
import { routes } from "~/constants/routes";
import { useRouter } from "next/navigation";
import { parseTetraApiError } from "~/lib/utils";

interface Props {
  emoteUrl: string;
  emoteName: string;
}

export const EmoteContextOpenInManual = ({ emoteName, emoteUrl }: Props) => {
  const router = useRouter();
  const { mutateAsync } = api.tasks.add.useMutation({});

  const redirectToTask = (taskId: string) => {
    router.push(routes.tasks.id(taskId));
  };

  const addTask = async () => {
    const id = self.crypto.randomUUID();
    toast.loading("Requesting task...", { id });
    try {
      const newTaskId = await mutateAsync({
        emoteUrl,
        emoteName,
      });
      toast.success("Task created!", {
        id,
        action: { label: "Open", onClick: () => redirectToTask(newTaskId) },
      });
    } catch (error) {
      if (error instanceof Error) {
        const message = parseTetraApiError(error);
        toast.error(message, { id });
      } else {
        toast.error("Something went wrong", { id });
      }
    }
  };

  return (
    <ContextMenuItem onClick={addTask}>
      <Pencil1Icon />
      Manual Adjustment
    </ContextMenuItem>
  );
};
