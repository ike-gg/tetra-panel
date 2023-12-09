import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { ContextMenuItem } from "~/components/ui/context-menu";

interface Props {
  removeFn: () => Promise<string>;
  hideEmoteFn: () => void;
  emoteName: string;
}

export const RemoveEmoteContextMenu = ({
  removeFn,
  emoteName,
  hideEmoteFn,
}: Props) => {
  return (
    <ContextMenuItem
      onClick={() => {
        toast.promise(removeFn, {
          loading: `Removing ${emoteName} emote...`,
          success: (result) => {
            hideEmoteFn();
            return result;
          },
          error: (error: string) => error,
        });
      }}
      className="bg-destructive-foreground text-destructive"
    >
      <TrashIcon />
      Delete
    </ContextMenuItem>
  );
};
