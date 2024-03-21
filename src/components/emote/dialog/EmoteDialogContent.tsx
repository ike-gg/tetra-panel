import { useGuildStore } from "~/store/guildStore";
import * as Dialog from "../../ui/dialog";
import { type EmoteProp } from "../Emote";
import { Button } from "../../ui/button";
import { Plus, MoreVertical } from "lucide-react";
import { AddToGuildDropdownItem } from "../dropdown/AddToGuildDropdownItem";
import { EmoteOriginElement } from "../origin/EmoteOriginElement";
import { type Metadata } from "sharp";
import { Badge } from "../../ui/badge";
import { Spinner } from "../../ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { type Dispatch, type SetStateAction } from "react";
import { type FittingOptions } from "~/types";
import { cn } from "~/lib/utils";
import { EmoteDialogDiscordPreview } from "./EmoteDialogDiscordPreview";
import { EmoteStatic } from "../EmoteStatic";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { routes } from "~/constants/routes";
import { toast } from "sonner";
import { EmoteDialogSize } from "./EmoteDialogSize";
import { EmoteDialogWideWarning } from "./EmoteDialogWideWarning";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { EmoteDialogDropdownManualAdjustment } from "./dialogDropdown/EmoteDialogDropdownManualAdjustment";
import { EmoteDialogDropdownSaveEmote } from "./dialogDropdown/EmoteDialogDropdownSaveEmote";
import { EmoteDialogDropdownCopyReference } from "./dialogDropdown/EmoteDialogDropdownCopyReference";
import { type EmoteProviderData } from "~/types/emote";
import { EmoteDialogDropdownProviderData } from "./dialogDropdown/EmoteDialogDropdownProviderData";

interface Props {
  providerData?: EmoteProviderData | null;
  isEmoteProviderDataLoading: boolean;
  isMetadataLoading: boolean;
  metadata?: Metadata;
  exceededSize?: boolean;
  fitting: FittingOptions;
  setFitting: Dispatch<SetStateAction<FittingOptions>>;
  emote: EmoteProp;
}

export const EmoteDialogContent = ({
  isMetadataLoading,
  metadata,
  exceededSize,
  fitting,
  setFitting,
  emote,
  isEmoteProviderDataLoading,
  providerData,
}: Props) => {
  const guilds = useGuildStore((state) => state.guilds);

  const router = useRouter();

  const { emoteName, origin, reference, animated } = emote;
  const { size: imageSize, format, width, height } = metadata ?? {};

  const aspectRatio = width && height ? width / height : 1;
  const isSquare = aspectRatio > 0.95 && aspectRatio < 1.05;
  const isWideEmote = aspectRatio > 1.3;

  const fittingImageClass = cn(
    fitting === "contain" && "object-contain",
    fitting === "cover" && "object-cover",
    fitting === "fill" && "object-fill",
  );

  const {
    mutateAsync: addManualAdjustment,
    isLoading: isManualAdjustmentLoading,
  } = api.tasks.add.useMutation();

  const {
    mutateAsync: addEmote,
    isLoading: isAddEmoteLoading,
    isSuccess: isEmoteSaved,
  } = api.savedEmotes.add.useMutation();

  const handleManualAdjustment = async () => {
    const { emoteUrl, emoteName } = emote;
    try {
      const taskId = await addManualAdjustment({ emoteUrl, emoteName });
      router.push(routes.tasks.id(taskId));
    } catch (_) {
      toast.error("Request to create task failed, please try again.");
    }
  };

  const handleSaveEmote = async () => {
    try {
      await addEmote(emote);
    } catch (_) {
      toast.error("Request to save emote failed, please try again.");
    }
  };

  return (
    <Dialog.DialogContent>
      <Dialog.DialogHeader className="flex-row items-center gap-3 space-y-0">
        <EmoteOriginElement
          className="size-7 rounded-lg border border-neutral-200 bg-neutral-100 fill-neutral-500 stroke-2 p-1.5"
          origin={origin}
        />
        <h2>{emoteName}</h2>
        <EmoteDialogSize
          isMetadataLoading={isMetadataLoading}
          exceededSize={exceededSize}
          imageSize={imageSize}
        />
        {format && (
          <Badge variant="secondary" className="uppercase">
            {format}
          </Badge>
        )}
      </Dialog.DialogHeader>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <EmoteStatic emote={emote} className={fittingImageClass} />
        <EmoteDialogDiscordPreview
          emote={emote}
          fittingImageClass={fittingImageClass}
        />
      </div>
      {isWideEmote && <EmoteDialogWideWarning />}
      <Dialog.DialogFooter className="flex-row gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="mr-auto ease-out [&[data-state='open']>svg]:opacity-50"
            >
              <MoreVertical className="opacity-100 transition-opacity" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56" align="start">
            {animated && (
              <EmoteDialogDropdownManualAdjustment
                handleManualAdjustment={handleManualAdjustment}
                isManualAdjustmentLoading={isManualAdjustmentLoading}
              />
            )}
            <EmoteDialogDropdownSaveEmote
              handleSaveEmote={handleSaveEmote}
              isAddEmoteLoading={isAddEmoteLoading}
              isEmoteSaved={isEmoteSaved}
            />
            <EmoteDialogDropdownCopyReference reference={reference} />
            {providerData && (
              <EmoteDialogDropdownProviderData
                isEmoteProviderDataLoading={isEmoteProviderDataLoading}
                providerData={providerData}
              />
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        {!isSquare && (
          <Select
            value={fitting}
            onValueChange={(s) => setFitting(s as FittingOptions)}
          >
            <SelectTrigger className="max-w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cover">Cover</SelectItem>
              <SelectItem value="contain">Contain</SelectItem>
              <SelectItem value="fill">Fill</SelectItem>
            </SelectContent>
          </Select>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isMetadataLoading}>
            <Button
              size={isMetadataLoading ? "icon" : "default"}
              className="flex-1 gap-2 sm:flex-initial"
            >
              {isMetadataLoading ? (
                <Spinner className="size-4 border-neutral-100" />
              ) : (
                <>
                  {exceededSize ? "Add optimized" : "Add directly"}
                  <Plus className="w-4" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {guilds?.map((guild) => (
              <AddToGuildDropdownItem
                key={emoteName + guild.id}
                guild={guild}
                {...emote}
                fitting={fitting}
              />
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog.DialogFooter>
    </Dialog.DialogContent>
  );
};
