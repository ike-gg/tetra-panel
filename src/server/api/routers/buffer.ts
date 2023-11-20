import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const bufferRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ url: z.string().url() }))
    .query(async ({ input }) => {
      const { url } = input;
      try {
        const request = await fetch(url);
        const arrayBuffer = await request.arrayBuffer();
        return arrayBuffer;
      } catch (e) {
        throw new Error(String(e));
      }
    }),

  sperma: publicProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(({ input }) => {
      const { url } = input;
      return url;
    }),
});
