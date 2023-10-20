import { type PartialGuild } from "discord-oauth2";
import { cookies } from "next/headers";
import { GuildButton } from "~/components/guilds/GuildButton";
import { TypographyH2 } from "~/components/ui/typography";

export default async function PageGuikdsHomeParallel() {
  const guildsRequest = await fetch("http://localhost:3002/guilds", {
    headers: { Cookie: cookies().toString() },
    cache: "force-cache",
  });

  const { guilds, managingGuilds, guildsMissingTetra } =
    (await guildsRequest.json()) as {
      guilds: PartialGuild[];
      managingGuilds: PartialGuild[];
      guildsMissingTetra: PartialGuild[];
    };

  return (
    <div className="flex flex-col gap-4">
      {managingGuilds && managingGuilds.length > 0 && (
        <div>
          <TypographyH2>Managed servers</TypographyH2>
          <div className="flex flex-wrap gap-2">
            {managingGuilds?.map((guild) => (
              <GuildButton guild={guild} key={guild.id} />
            ))}
          </div>
        </div>
      )}
      {guilds && guilds.length > 0 && (
        <div>
          <TypographyH2>Tetra-Connected servers</TypographyH2>
          <div className="flex flex-wrap gap-2">
            {guilds?.map((guild) => (
              <GuildButton variant="outline" guild={guild} key={guild.id} />
            ))}
          </div>
        </div>
      )}
      {guildsMissingTetra && guildsMissingTetra.length > 0 && (
        <div>
          <TypographyH2>Add a bot</TypographyH2>
          <div className="flex flex-wrap gap-2">
            {guildsMissingTetra?.map((guild) => (
              <GuildButton variant="outline" guild={guild} key={guild.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
