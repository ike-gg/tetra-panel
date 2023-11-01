import { PrismaClient } from "@prisma/client";
import { InfoCircledIcon } from "@radix-ui/react-icons";
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

  return (
    <div>
      <TypographyH2>Tasks</TypographyH2>
      <div className="flex flex-wrap gap-4">
        {taskStack.length === 0 && (
          <div className="flex h-24 max-w-[240px] flex-col items-center justify-center gap-0.5 rounded-lg border border-neutral-300 bg-neutral-100 bg-gradient-to-br p-4 px-8 text-center text-card-foreground shadow-lg">
            <h3 className="flex items-center gap-2">
              <InfoCircledIcon />
              No tasks found
            </h3>
            <p className="text-xs text-muted-foreground">
              Manual adjustment tasks will show up here.
            </p>
          </div>
        )}
        {taskStack?.map((task) => (
          <TaskCard taskDetails={task} key={task.id} />
        ))}
      </div>
    </div>
  );
}
