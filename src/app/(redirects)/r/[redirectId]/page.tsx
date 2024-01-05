/* eslint-disable @next/next/no-img-element */
import { PrismaClient } from "@prisma/client";
import { ArrowRightIcon } from "lucide-react";
import { getProviders } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignIn } from "~/components/auth/SignIn";
import { Button } from "~/components/ui/button";
import { routes } from "~/constants/routes";
import { getGuildIcon } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";

export default async function TaskIdPage({
  params,
}: {
  params: { redirectId: string };
}) {
  if (!params.redirectId) redirect(routes.auth);

  const prisma = new PrismaClient();
  const session = await getServerAuthSession();

  const task = await prisma.manualAdjustment.findFirst({
    where: { id: params.redirectId },
  });

  if (!task) redirect(routes.panel);

  if (session) {
    const { id } = session.user;
    const userAccount = await prisma.account.findFirst({
      where: { userId: id },
    });
    if (userAccount?.providerAccountId === task.accountId) {
      redirect(routes.tasks.id(params.redirectId));
    } else {
      redirect(routes.panel);
    }
  }

  return (
    <div className="flex max-w-sm flex-col gap-4 rounded-xl border bg-neutral-50 p-8 text-center shadow-xl">
      <div className="flex items-center justify-center gap-4">
        <img
          alt="emote preview"
          className="h-24 w-24 rounded-xl border object-contain shadow-xl"
          src={task.emoteUrl}
        />
        {task.guildIcon && task.guildId && (
          <>
            <ArrowRightIcon className="text-neutral-300" />
            <img
              alt="guild"
              className="h-24 w-24 rounded-xl border object-contain shadow-xl"
              src={getGuildIcon(task.guildId, task.guildIcon, { size: 256 })}
            />
          </>
        )}
      </div>
      <h1 className="text text-foreground">
        Here you complete manual adjustment of your emote{" "}
        <b>{task.emoteName}</b> to <b>{task.guildName}</b>.
      </h1>
      <p className="text-sm text-muted-foreground">
        Please login before proceed.
      </p>
      <Button asChild>
        <Link href={routes.auth}>Login</Link>
      </Button>
    </div>
  );
}
