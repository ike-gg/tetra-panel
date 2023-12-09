import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const tasksRouter = createTRPCRouter({
  add: protectedProcedure
    .input(z.object({ emoteUrl: z.string().url(), emoteName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const { emoteUrl, emoteName } = input;

      try {
        const user = await ctx.db.account.findFirst({ where: { userId: id } });
        if (!user) throw new Error("User not found");

        const task = await ctx.db.manualAdjustment.create({
          data: {
            emoteName,
            emoteUrl,
            expiresOn: new Date(new Date().getTime() + 1000 * 60 * 30),
            accountId: user.providerAccountId,
          },
        });

        return task.id;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        } else {
          throw "Uncaught error";
        }
      }
    }),
});

// const tasks = await ctx.db.manualAdjustment.findMany({
//   where: {
//     account: {
//       userId: id,
//     },
//     expiresOn: {
//       gte: new Date(new Date().getTime() - 1000 * 60 * 30),
//     },
//   },
// });
