import { PrismaClient } from "@prisma/client";
import { TaskCard } from "~/components/tasks/TaskCard";
import { TypographyH2 } from "~/components/ui/typography";

import { getServerAuthSession } from "~/server/auth";

export const dynamic = "force-dynamic";

export default async function PageTasksHomeParallel() {
  const session = await getServerAuthSession();

  const prisma = new PrismaClient();
  const accountUser = await prisma.account.findFirst({
    where: { userId: session!.user.id },
  });

  const allTaskStack = await prisma.manualAdjustment.findMany({
    where: { accountId: accountUser?.providerAccountId },
  });

  const taskStack = allTaskStack.filter((task) => {
    const taskExpireOn = new Date(task.expiresOn);
    const currentTime = new Date();
    return taskExpireOn.getTime() > currentTime.getTime();
  });

  if (taskStack.length === 0) return null;

  return (
    <div>
      <TypographyH2>Tasks</TypographyH2>
      <div className="flex flex-wrap gap-4">
        {taskStack?.map((task) => (
          <TaskCard taskDetails={task} key={task.id} />
        ))}
      </div>
    </div>
  );
}
