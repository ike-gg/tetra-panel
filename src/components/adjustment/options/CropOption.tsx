/* eslint-disable @next/next/no-img-element */
import "react-image-crop/dist/ReactCrop.css";
import { ScissorsIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import { useAdjustmentStore } from "~/app/store/adjustmentStore";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";

interface Props {
  emoteUrl: string;
}

export const CropOption = ({ emoteUrl }: Props) => {
  const ref = useRef<HTMLImageElement>(null);
  const { setCrop, removeCrop, crop } = useAdjustmentStore((state) => state);

  const [cropLib, setCropLib] = useState<Crop>();

  const submitCrop = () => {
    if (!cropLib || !ref.current) return;

    const { naturalWidth, width: refWidth } = ref.current;
    const scale = naturalWidth / refWidth;

    const { x, y, width, height } = cropLib;
    const x1 = Math.floor(x * scale);
    const y1 = Math.floor(y * scale);
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    const x2 = Math.floor(x1 + scaledWidth);
    const y2 = Math.floor(y1 + scaledHeight);
    setCrop({ x1, x2, y1, y2 });
  };

  return (
    <Dialog>
      <div className="flex w-full flex-1 gap-4">
        <DialogTrigger asChild>
          <Button
            variant={crop ? "default" : "secondary"}
            className="flex flex-1 items-center gap-2"
          >
            <ScissorsIcon /> Cut
          </Button>
        </DialogTrigger>
        {crop && (
          <Button onClick={() => removeCrop()} variant="destructive">
            Remove crop
          </Button>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crop your gif</DialogTitle>
            <DialogDescription>witam!</DialogDescription>
          </DialogHeader>
          <ReactCrop
            className="rounded-lg"
            crop={cropLib}
            onChange={(c) => setCropLib(c)}
          >
            <img
              ref={ref}
              className="w-full"
              src={emoteUrl}
              alt="emote preview to crop"
            />
          </ReactCrop>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={submitCrop} type="submit">
                Apply crop
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
};
