import { toast } from "sonner";
import { useGuildStore } from "~/app/store/guildStore";
import {
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuItem,
} from "~/components/ui/context-menu";
import wretch from "wretch";
import { endpoints } from "~/constants/apiroutes";
import { WretchError } from "wretch/resolver";
import { cn, getGuildIcon, parseTetraApiError } from "~/lib/utils";
import { useRouter } from "next/navigation";
import { routes } from "~/constants/routes";
import { Plus } from "lucide-react";

interface Props {
  emoteUrl: string;
  emoteName: string;
  exceededSize?: boolean;
}

export const EmoteContextAddToGuild = ({
  emoteName,
  emoteUrl,
  exceededSize,
}: Props) => {
  const guilds = useGuildStore((state) => state.guilds);

  const addDisabled = !guilds || guilds.length === 0;

  const router = useRouter();

  const redirectToTask = (taskId: string) => {
    router.push(routes.tasks.id(taskId));
  };

  const addEmote = async (guildId: string) => {
    const id = self.crypto.randomUUID();
    toast.loading(`Submitting ${emoteName} emote...`, { id });
    try {
      const response: { message: string } = await wretch(
        endpoints.addEmoteToGuild(guildId),
      )
        .options({ credentials: "include" })
        .post({ emoteName, emoteUrl })
        .json();

      toast.success(response.message, { id });
    } catch (error) {
      if (error instanceof WretchError && error.status === 301) {
        const { message, taskId } = error.json as {
          message: string;
          taskId: string;
        };
        toast.warning(message, {
          id,
          action: {
            label: "Open",
            onClick: () => redirectToTask(taskId),
          },
        });
      } else if (error instanceof Error) {
        const message = parseTetraApiError(error);
        toast.error(message, { id });
      } else {
        toast.error("Something went wrong", { id });
      }
    }
  };

  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger
        disabled={addDisabled}
        className={cn(addDisabled && "opacity-50")}
      >
        <Plus className="size-4" />{" "}
        {exceededSize ? "Add optimized to server" : "Add to server"}
      </ContextMenuSubTrigger>
      {guilds && (
        <ContextMenuSubContent>
          {guilds.map((guild) => (
            <ContextMenuItem
              onClick={() => addEmote(guild.id)}
              key={guild.id}
              className="min-w-[10rem] justify-between"
            >
              {guild.name}
              {guild.icon && (
                <img
                  src={getGuildIcon(guild.id, guild.icon, { size: 16 })}
                  alt="guild icon for"
                  className="ml-3 h-5 w-5 rounded-full"
                />
              )}
            </ContextMenuItem>
          ))}
        </ContextMenuSubContent>
      )}
    </ContextMenuSub>
  );
};
