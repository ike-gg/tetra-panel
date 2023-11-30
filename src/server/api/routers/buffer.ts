import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const bufferRouter = createTRPCRouter({
  getSize: publicProcedure.input(z.string().url()).query(async ({ input }) => {
    const request = await fetch(input);
    const arrayBuffer = await request.arrayBuffer();
    return arrayBuffer.byteLength;
  }),
});
