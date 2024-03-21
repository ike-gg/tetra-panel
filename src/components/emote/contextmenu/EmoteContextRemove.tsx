import { Trash } from "lucide-react";
import { toast } from "sonner";
import { ContextMenuItem } from "~/components/ui/context-menu";

interface Props {
  removeFn: () => Promise<string>;
  hideEmoteFn: () => void;
  emoteName: string;
  guildName?: string;
}

export const EmoteContextRemove = ({
  removeFn,
  emoteName,
  hideEmoteFn,
  guildName,
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
      <Trash className="size-4" />
      Delete {guildName ? `from ${guildName}` : ""}
    </ContextMenuItem>
  );
};
