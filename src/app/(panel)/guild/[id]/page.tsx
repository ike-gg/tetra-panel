import { cookies } from "next/headers";
import { type GuildEmoji } from "discord.js";
import { endpoints } from "~/constants/apiroutes";
import { type EmoteInterface } from "~/components/emote/Emote";
import { TypographyH2 } from "~/components/ui/typography";
import { EmotesGuild } from "~/components/guilds/EmotesGuild";
import { GuildIcon } from "~/components/ui/guildIcon";
import { Badge } from "~/components/ui/badge";
import { Sparkles, Square, SquareAsterisk } from "lucide-react";
import { cn } from "~/lib/utils";

interface EmoteStats {
  used: number;
  limit: number;
  free: number;
}

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

  const { emotes, name, icon, stats, level } = (await request.json()) as {
    emotes: GuildEmoji[];
    name: string;
    icon: string | null;
    banner: string | null;
    stats: { animated: EmoteStats; static: EmoteStats };
    level: number;
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

  const animatedPercentage = Math.min(
    (stats.animated.used / stats.animated.limit) * 100,
    100,
  ).toFixed();
  const staticPercentage = Math.min(
    (stats.static.used / stats.static.limit) * 100,
    100,
  ).toFixed();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <GuildIcon
          className="size-12"
          id={id}
          iconId={icon ?? undefined}
          name={name}
        />
        <TypographyH2 className="flex items-center gap-4">{name}</TypographyH2>
        {level > 0 && (
          <Badge variant="primary">
            <Sparkles className="size-4" /> {level} Level
          </Badge>
        )}
        <Badge
          variant="outline"
          className="relative overflow-hidden font-normal"
        >
          <div
            style={{ width: `${staticPercentage}%` }}
            className={cn(
              "animate-scale-x animation-delay-100 absolute left-0 top-0 -z-50 h-full origin-left border-r border-neutral-300 bg-gradient-to-r from-transparent to-neutral-200",
            )}
          />
          <Square className="size-3" />
          Static emotes {stats.static.used}/{stats.static.limit}
        </Badge>
        <Badge
          variant="outline"
          className="relative overflow-hidden font-normal"
        >
          <div
            style={{ width: `${animatedPercentage}%` }}
            className={cn(
              "animate-scale-x animation-delay-400 absolute left-0 top-0 -z-50 h-full origin-left border-r border-neutral-300 bg-gradient-to-r from-transparent to-neutral-200",
            )}
          />
          <SquareAsterisk className="size-3" />
          Animated emotes {stats.animated.used}/{stats.animated.limit}
        </Badge>
      </div>
      <EmotesGuild list={emotesI} guildId={id} />
    </div>
  );
}
