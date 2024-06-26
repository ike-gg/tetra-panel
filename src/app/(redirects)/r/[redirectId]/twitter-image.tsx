/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Music set";
export const size = {
  width: 1200,
  height: 600,
};

import { Inter } from "next/font/google";
import { api } from "~/trpc/server";
import { getGuildIcon } from "~/lib/utils";
const inter = Inter({ subsets: ["latin"] });

export const contentType = "image/png";

export default async function Image({
  params: { redirectId },
}: {
  params: { redirectId: string };
}) {
  if (!redirectId) return null;

  const task = await api.tasks.get.query(redirectId);

  if (!task) return null;

  const { emoteUrl, guildIcon, guildId } = task;

  return new ImageResponse(
    (
      <div
        className={inter.className}
        style={{
          backgroundImage:
            "radial-gradient(circle, white, #fafafa 5%, #f5f5f5 25%, #fafafa 25%, #f5f5f5 45%, #fafafa 45%, #f5f5f5 65%, #fafafa 65%, #f5f5f5 85%, #fafafa 85%, #f5f5f5 100%, #fafafa 100%)",
          fontSize: 78,
          width: "100%",
          height: "100%",
          position: "relative",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div></div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            padding: 35,
            gap: 35,
          }}
        >
          <img
            style={{
              borderRadius: 20,
              objectFit: "contain",
              border: "1px solid #d4d4d4",
              boxShadow: "0 10px 30px 10px #d4d4d4",
              backgroundColor: "#fafafa",
            }}
            src={emoteUrl}
            width={200}
            height={200}
          />
          <svg
            width="35"
            height="35"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
              fill="black"
              fillRule="evenodd"
              clip-rule="evenodd"
            />
          </svg>
          {guildIcon && guildId && (
            <img
              src={getGuildIcon(guildId, guildIcon, { size: 256 })}
              width={200}
              height={200}
              style={{
                borderRadius: 20,
                objectFit: "contain",
                border: "1px solid #d4d4d4",
                boxShadow: "0 10px 30px 10px #d4d4d4",
                backgroundColor: "#fafafa",
              }}
            />
          )}
        </div>
        <div></div>
      </div>
    ),
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      // fonts: [
      //   {
      //     name: "Inter",
      //     data: await interFont,
      //     style: "normal",
      //     weight: 400,
      //   },
      // ],
    },
  );
}
