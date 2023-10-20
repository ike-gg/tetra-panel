import { cookies } from "next/headers";
import { type GuildEmoji } from "discord.js";
import Image from "next/image";

export default async function GuildIdPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const emotesRequest = await fetch(
    `http://localhost:3002/guilds/${id}/emotes`,
    {
      headers: { Cookie: cookies().toString() },
      cache: "force-cache",
    },
  );

  const { emotes } = (await emotesRequest.json()) as { emotes: GuildEmoji[] };

  return (
    <div>
      Emotes of this guild:
      <div className="grid-cols-16 grid">
        {emotes?.map((emote) => {
          const { name, url } = emote;
          return (
            <div key={emote.id}>
              <p>{name}</p>
              <Image
                width={96}
                height={96}
                src={url}
                alt={`emoji named ${name}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
