import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import sharp from "sharp";

export const bufferRouter = createTRPCRouter({
  getMetadata: publicProcedure
    .input(z.string().url())
    .query(async ({ input }) => {
      const request = await fetch(input);
      const arrayBuffer = await request.arrayBuffer();
      return await sharp(arrayBuffer).metadata();
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
