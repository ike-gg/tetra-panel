import { PrismaClient } from "@prisma/client";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Emote } from "~/components/emotes/Emote";
import { TypographyH2 } from "~/components/ui/typography";

import { getServerAuthSession } from "~/server/auth";

export const dynamic = "force-dynamic";

export default async function PageSavedemotesHomeParallel() {
  const session = await getServerAuthSession();

  const prisma = new PrismaClient();
  const accountUser = await prisma.account.findFirst({
    where: { userId: session!.user.id },
  });

  const savedEmotes = await prisma.emotes.findMany({
    where: { accountId: accountUser?.providerAccountId },
    take: 8,
    orderBy: {
      expiresOn: "desc",
    },
  });

  return (
    <div>
      <TypographyH2>Last 8 saved emotes</TypographyH2>
      <div className="flex flex-wrap gap-4">
        {savedEmotes.length === 0 && (
          <div className="flex h-32 max-w-xs flex-col items-center justify-center gap-0.5 rounded-lg border border-neutral-300 bg-neutral-100 bg-gradient-to-br p-4 px-8 text-center text-card-foreground shadow-lg">
            <h3 className="flex items-center gap-2">
              <InfoCircledIcon />
              No emotes found
            </h3>
            <p className="text-xs text-muted-foreground">
              To save emote use context command &quot;Save to panel&quot; on
              message that contains emotes that you&apos;d like to save
            </p>
          </div>
        )}
        {savedEmotes?.map((emote) => <Emote details={emote} key={emote.id} />)}
      </div>
    </div>
  );
}
