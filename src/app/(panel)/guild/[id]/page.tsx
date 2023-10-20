import { cookies } from "next/headers";
import { type GuildEmoji } from "discord.js";
import Image from "next/image";
import { endpoints } from "~/constants/apiroutes";

export default async function GuildIdPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const emotesRequest = await fetch(endpoints.getGuildEmotes(id), {
    headers: { Cookie: cookies().toString() },
    cache: "force-cache",
  });

  const { emotes } = (await emotesRequest.json()) as { emotes: GuildEmoji[] };

  return (
    <div>
      Emotes of this guild:
      <div className="grid grid-cols-16">
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
