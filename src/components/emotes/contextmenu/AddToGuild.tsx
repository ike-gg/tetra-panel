import { PlusIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { useEmoteContextStore } from "~/app/store/emoteContextStore";
import {
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuItem,
} from "~/components/ui/context-menu";
import wretch from "wretch";
import { endpoints } from "~/constants/apiroutes";
import { WretchError } from "wretch/resolver";
import { getGuildIcon, parseTetraApiError } from "~/lib/utils";
import { useRouter } from "next/navigation";
import { routes } from "~/constants/routes";

interface Props {
  emoteUrl: string;
  emoteName: string;
}

export const AddToGuildContextMenu = ({ emoteName, emoteUrl }: Props) => {
  const guilds = useEmoteContextStore((state) => state.guilds);

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

  if (!guilds) return null;

  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger>
        <PlusIcon /> Add to server
      </ContextMenuSubTrigger>
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
    </ContextMenuSub>
  );
};
