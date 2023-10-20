/* eslint-disable @next/next/no-img-element */
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { TypographyH2, TypographyH4 } from "~/components/ui/typography";
import { tasks } from "~/constants/routes";

import { getServerAuthSession } from "~/server/auth";

export default async function PageTasksHomeParallel() {
  const session = await getServerAuthSession();

  const prisma = new PrismaClient();
  const accountUser = await prisma.account.findFirst({
    where: { userId: session!.user.id },
  });

  const taskStack = await prisma.manualAdjustment.findMany({
    where: { accountId: accountUser?.providerAccountId },
  });

  if (taskStack.length === 0) return null;

  return (
    <div>
      <TypographyH2>Tasks</TypographyH2>
      <div className="flex flex-wrap gap-4">
        {taskStack?.map((task) => {
          const { emoteName, emoteUrl, expiresOn, id, guildIcon, guildName } =
            task;
          return (
            <Link
              key={id}
              href={tasks.id(id)}
              className="flex min-w-[16rem] items-center gap-3 rounded-lg border border-neutral-200 bg-gradient-to-br from-neutral-50 via-neutral-200/75 to-neutral-100 p-4 shadow-lg hover:border-neutral-400"
            >
              <img
                alt={`emote ${emoteName}`}
                className="h-16 w-16 rounded-md border border-neutral-300 object-contain shadow-xl"
                src={emoteUrl}
              />
              <div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={guildIcon ?? ""} />
                  </Avatar>
                  {guildName}
                </div>
                <TypographyH4>{emoteName}</TypographyH4>
                <code className="text-xs text-muted-foreground">
                  expires in: {expiresOn.getMinutes()}
                </code>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
