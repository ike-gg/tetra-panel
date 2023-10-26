import { cookies } from "next/headers";
import { type GuildEmoji } from "discord.js";
import { endpoints } from "~/constants/apiroutes";
import { Emote } from "~/components/emotes/Emote";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { firstLetters, getGuildBanner, getGuildIcon } from "~/lib/utils";
import { TypographyH2 } from "~/components/ui/typography";
import { Input } from "~/components/ui/input";
import { Search } from "~/components/ui/search";

export default async function GuildIdPage({
  params,
  searchParams: { search },
}: {
  params: { id: string };
  searchParams: { search: string };
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

  const { emotes, name, icon, banner } = (await request.json()) as {
    emotes: GuildEmoji[];
    name: string;
    icon: string | null;
    banner: string | null;
  };

  return (
    <div className="space-y-5">
      <TypographyH2 className="flex items-center gap-2">
        <Avatar className="h-16 w-16">
          {icon && <AvatarImage src={getGuildIcon(id, icon)} />}
          <AvatarFallback>{firstLetters(name)}</AvatarFallback>
        </Avatar>
        Emotes of {name}
      </TypographyH2>
      <Search />
      <div className="grid grid-cols-7 gap-1 md:grid-cols-12 md:gap-3 lg:grid-cols-16">
        {emotes
          ?.filter((emote) => {
            const emoteName = emote.name?.toLowerCase() ?? "";
            const searchQuery = search?.toLowerCase() ?? "";
            return emoteName.includes(searchQuery);
          })
          .map((emote) => (
            <Emote
              key={emote.id}
              details={{
                emoteName: emote.name ?? "Emote",
                emoteUrl: emote.url,
                origin: "DISCORD",
                reference: emote.id,
              }}
              guildId={id}
            />
          ))}
      </div>
    </div>
  );
}
