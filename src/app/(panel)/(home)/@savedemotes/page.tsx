import { PrismaClient } from "@prisma/client";
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
    take: 6,
    orderBy: {
      expiresOn: "desc",
    },
  });

  return (
    <div>
      <TypographyH2>Saved emotes</TypographyH2>
      <div className="flex flex-wrap gap-4">
        {savedEmotes?.map((emote) => (
          <Emote className="w-28" details={emote} key={emote.id} />
        ))}
      </div>
    </div>
  );
}
