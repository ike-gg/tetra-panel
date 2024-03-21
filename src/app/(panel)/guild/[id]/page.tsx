import { cookies } from "next/headers";
import { type GuildEmoji } from "discord.js";
import { endpoints } from "~/constants/apiroutes";
import { type EmoteInterface } from "~/components/emote/Emote";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { firstLetters, getGuildIcon } from "~/lib/utils";
import { TypographyH2 } from "~/components/ui/typography";
import { EmotesGuild } from "~/components/guilds/EmotesGuild";

export default async function GuildIdPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const request = await fetch(endpoints.getGuild(id), {
    headers: { Cookie: cookies().toString() },
  });

  if (request.status === 429) {
    throw "slow down";
  }

  if (!request.ok) {
    const { error } = (await request.json()) as { error: string };
    throw new Error(error);
  }

  const { emotes, name, icon } = (await request.json()) as {
    emotes: GuildEmoji[];
    name: string;
    icon: string | null;
    banner: string | null;
  };

  const emotesI: EmoteInterface[] = emotes.map((emote): EmoteInterface => {
    const { name, id, animated } = emote;

    const url = animated
      ? `https://cdn.discordapp.com/emojis/${id}.gif`
      : `https://cdn.discordapp.com/emojis/${id}.webp`;

    return {
      animated: animated!,
      emoteName: name!,
      emoteUrl: url,
      origin: "DISCORD",
      reference: id,
    };
  });

  return (
    <div className="space-y-5">
      <TypographyH2 className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          {icon && <AvatarImage src={getGuildIcon(id, icon)} />}
          <AvatarFallback>{firstLetters(name)}</AvatarFallback>
        </Avatar>
        {name} emotes
      </TypographyH2>
      <EmotesGuild list={emotesI} guildId={id} />
    </div>
  );
}
