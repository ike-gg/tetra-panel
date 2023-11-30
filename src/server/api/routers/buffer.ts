import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

export const bufferRouter = createTRPCRouter({
  getSize: publicProcedure.input(z.string().url()).query(async ({ input }) => {
    const request = await fetch(input);
    const arrayBuffer = await request.arrayBuffer();
    return arrayBuffer.byteLength;
  }),

  getTask: publicProcedure.input(z.string()).query(async ({ input }) => {
    const prisma = new PrismaClient();
    const task = await prisma.manualAdjustment.findFirst({
      where: { id: input },
    });
    if (!task) return null;
    const { emoteName, emoteUrl, guildId, guildIcon } = task;
    return {
      emoteName,
      emoteUrl,
      guildId,
      guildIcon,
    };
  }),
});
