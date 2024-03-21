import {
  type PostEmoteURL,
  postEmoteByURL,
} from "~/api/mutations/postEmoteByURL";
import { toast } from "sonner";
import { WretchError } from "wretch/resolver";
import { useRouter } from "next/navigation";
import { routes } from "~/constants/routes";
import { parseTetraApiError } from "~/lib/utils";
import { useState } from "react";

export const useUploadEmote = () => {
  const [isEmoteUploading, setIsEmoteUploading] = useState(false);
  const [emoteState, setEmoteState] = useState<"init" | "uploaded" | "error">(
    "init",
  );

  const router = useRouter();

  const updateEmote = async (data: PostEmoteURL) => {
    setIsEmoteUploading(true);

    const id = self.crypto.randomUUID();
    toast.loading(`Submitting ${data.name} emote...`, { id });

    try {
      const response = await postEmoteByURL(data);
      setEmoteState("uploaded");
      toast.success(response.message, { id });
    } catch (error) {
      setEmoteState("error");
      if (error instanceof WretchError && error.status === 301) {
        const { message, taskId } = error.json as {
          message: string;
          taskId: string;
        };

        toast.warning(message, {
          id,
          action: {
            label: "Open",
            onClick: () => router.push(routes.tasks.id(taskId)),
          },
        });
      } else if (error instanceof Error) {
        const message = parseTetraApiError(error);
        toast.error(message, { id });
      } else {
        toast.error("Something went wrong", { id });
      }
    } finally {
      setIsEmoteUploading(false);
    }
  };

  return { updateEmote, isEmoteUploading, emoteState };
};
