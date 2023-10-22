/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { type ManualAdjustment } from "@prisma/client";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useAdjustmentStore } from "~/app/store/adjustmentStore";
import { ColorsOption } from "./options/ColorsOption";
import { LossyOption } from "./options/LossyOption";
import { ScaleOption } from "./options/ScaleOption";
import { type Metadata } from "sharp";
import { CutOption } from "./options/CutOption";
import { useGifsicle } from "~/hooks/useGifsicle";
import { FrameRateOption } from "./options/FrameRateOption";
import { FittingsOption } from "./options/FittingsOption";
import { CropOption } from "./options/CropOption";
import { EmotePreview } from "./EmotePreview";
import { Progress } from "../ui/progress";
import { SubmitEmote } from "./SubmitEmote";

interface Props {
  details: ManualAdjustment;
  emoteBase64: string;
  metadata: Metadata;
}

const MAX_EMOTE_SIZE = 262144;

export function Adjustment({ details, emoteBase64, metadata }: Props) {
  const { colors, crop, cut, frameRate, lossy, scale, fitting, reset } =
    useAdjustmentStore((state) => state);

  const { processing, processed, processedSize } = useGifsicle({
    buffer: emoteBase64,
    options: { colors, crop, cut, frameRate, lossy, scale, fitting, metadata },
  });

  const [isCorrectSize, setIsCorrectSize] = useState(false);

  useEffect(() => {
    if (processedSize && processedSize < MAX_EMOTE_SIZE) {
      setIsCorrectSize(true);
    } else {
      setIsCorrectSize(false);
    }
  }, [processedSize]);

  useEffect(() => reset(), []);

  return (
    <div className="mx-auto max-w-lg space-y-4">
      ADJUSTMENT
      <div className="bg-radar flex w-full flex-col items-center gap-4 rounded-lg border border-neutral-200 from-neutral-100 to-neutral-50 p-12 py-8">
        {/* <p>wypierdalaj!</p>
        <Progress
          className="flex h-2 bg-neutral-200"
          value={Math.min((processedSize! / MAX_EMOTE_SIZE) * 100, 100)}
          max={1}
        /> */}
        <div className="flex w-full items-center justify-between gap-6">
          <EmotePreview
            base64={`data:image;base64,${emoteBase64}`}
            size={metadata.size ?? 0}
          />
          <ArrowRightIcon />
          <EmotePreview
            base64={
              processed.startsWith("data")
                ? processed
                : `data:image;base64,${processed}`
            }
            size={processedSize ?? 0}
            isProcessing={processing}
          />
        </div>
      </div>
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
        <div className="grid w-full grid-cols-2 gap-4">
          <ColorsOption />
          <LossyOption />
          <ScaleOption />
          <FrameRateOption />
        </div>
        <div className="w-full">
          <CutOption frames={metadata.pages!} />
        </div>
        <FittingsOption />
        <CropOption emoteUrl={details.emoteUrl} />
      </div>
      <SubmitEmote
        isCorrectSize={isCorrectSize}
        modifiedBase64={processed}
        task={details}
      />
    </div>
  );
}
