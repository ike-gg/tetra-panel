import { PrismaClient } from "@prisma/client";
import sharp from "sharp";
import { Adjustment } from "~/components/adjustment/Adjustment";
import { arrayBufferToBase64 } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";

export default async function TaskIdPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerAuthSession();

  const prisma = new PrismaClient();

  const accountUser = await prisma.account.findFirst({
    where: { userId: session!.user.id },
  });

  const taskDetails = await prisma.manualAdjustment.findFirst({
    where: { accountId: accountUser?.providerAccountId, id: params.id },
  });

  if (!taskDetails) {
    throw new Error("Task not found or has expired.");
  }

  const emoteRequest = await fetch(taskDetails.emoteUrl);
  const emoteBuffer = await emoteRequest.arrayBuffer();
  const base64Emote = arrayBufferToBase64(emoteBuffer);

  const sharpInstance = sharp(emoteBuffer, { animated: true });
  const metadata = await sharpInstance.metadata();

  return (
    <Adjustment
      metadata={metadata}
      emoteBase64={base64Emote}
      details={taskDetails}
    />
  );
}
