import { type PartialGuild } from "discord-oauth2";
import { cookies } from "next/headers";
import { GuildButton } from "~/components/guilds/GuildButton";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { TypographyH2 } from "~/components/ui/typography";
import { endpoints } from "~/constants/apiroutes";

export default async function PageGuikdsHomeParallel() {
  try {
    const request = await fetch(endpoints.getUserGuilds, {
      headers: { Cookie: cookies().toString() },
      cache: "force-cache",
    });

    if (!request.ok) {
      const response = (await request.json()) as Record<string, string>;
      throw new Error(
        `Request failed with status ${request.status} (${JSON.stringify(
          response,
        )})`,
      );
    }

    const { guilds, managingGuilds, guildsMissingTetra } =
      (await request.json()) as {
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
            <TypographyH2>Invite Tetra</TypographyH2>
            <div className="flex flex-wrap gap-2">
              {guildsMissingTetra?.map((guild) => (
                <GuildButton
                  asInvite
                  variant="outline"
                  guild={guild}
                  key={guild.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Fetching guilds failed</AlertTitle>
        <AlertDescription>{String(error)}</AlertDescription>
      </Alert>
    );
  }
}
