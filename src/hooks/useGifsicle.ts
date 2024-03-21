/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import { type Metadata } from "sharp";
import { type AdjustmentOptionsStateProperties } from "~/store/adjustmentStore";
import {
  arrayBufferToBase64,
  base64ToArrayBuffer,
  fileToBase64,
} from "~/lib/utils";
import gifsicle from "gifsicle-wasm-browser";

interface UseGifsicleOptions extends AdjustmentOptionsStateProperties {
  metadata: Metadata;
}

interface UseGifsicleProps {
  buffer: string;
  options: UseGifsicleOptions;
}

export const useGifsicle = ({ buffer, options }: UseGifsicleProps) => {
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(buffer);
  const [processedSize, setSize] = useState(options.metadata.size);

  const { metadata, colors, crop, cut, frameRate, lossy, scale, fitting } =
    options;

  let {
    width,
    pageHeight: height,
    pages,
    delay: _delays,
  } = metadata as {
    width: number;
    pageHeight: number;
    pages: number;
    delay: number[];
  };

  const delay = _delays[0]!;

  useEffect(() => {
    const processGif = async () => {
      setProcessing(true);

      let file: File | ArrayBuffer = base64ToArrayBuffer(buffer);

      // file = await runGifsicle(file, "");

      if (crop) {
        const { x1, x2, y1, y2 } = crop;
        width = x2 - x1;
        height = y2 - y1;
        file = await runGifsicle(file, "", `--crop ${x1},${y1}-${x2},${y2}`);
      }

      if (fitting === "cover") {
        const size = Math.min(height, width);
        const x1 = Math.floor((width - size) / 2);
        const y1 = Math.floor((height - size) / 2);
        const x2 = x1 + size;
        const y2 = y1 + size;
        file = await runGifsicle(file, ``, `--crop ${x1},${y1}-${x2},${y2}`);
      }

      if (fitting === "fill") {
        file = await runGifsicle(file, `--resize ${height}x${height}`);
      }

      if (cut && metadata?.pages) {
        const [first, second] = cut;
        if (second !== metadata.pages - 1) {
          const countRemovedFrames = metadata.pages - 1 - second;
          pages -= countRemovedFrames;
          file = await runGifsicle(
            file,
            `--delete #${second}-${metadata.pages - 1} --done`,
          );
        }
        if (first !== 0) {
          pages -= first;
          file = await runGifsicle(file, `--delete #0-${first} --done`);
        }
      }

      if (frameRate) {
        const args: string[] = [];
        const newDelay = Math.round((delay * frameRate) / 10);
        for (let x = 0; x < pages - 2; x += frameRate) {
          args.push(`--delay`);
          args.push(String(newDelay));
          args.push(`#${Math.round(x)}`);
        }
        file = await runGifsicle(file, args.join(" "));
      }

      if (colors ?? scale ?? lossy) {
        const args: string[] = [];
        colors && args.push(`--colors`, String(colors));
        scale && args.push("--scale", String(scale / 100));
        lossy && args.push(`--lossy=${lossy}`);
        file = await runGifsicle(file, args.join(" "));
      }

      if (file instanceof File) {
        setSize(file.size);
        const newBase64 = await fileToBase64(file);
        setProcessed(newBase64);
      } else {
        setSize(file.byteLength);
        const base64 = arrayBufferToBase64(file);
        setProcessed(base64);
      }
      setProcessing(false);
    };

    processGif();
  }, [crop, fitting, cut, frameRate, colors, lossy, scale, buffer]);

  return { processing, processed, processedSize };
};

const runGifsicle = async (
  file: File | ArrayBuffer,
  command: string,
  beforeInput = "",
) => {
  try {
    const [newFile] = await gifsicle.run({
      command: [
        `${beforeInput} -U input.gif ${command} -O3 -o /out/output.gif`,
      ],
      input: [{ file: file, name: "input.gif" }],
    });
    return newFile!;
  } catch (error) {
    throw new Error("Failed processing gif.");
  }
};
