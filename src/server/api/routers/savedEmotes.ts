import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const AddEmoteInputSchema = z.object({
  animated: z.boolean(),
  emoteName: z.string(),
  emoteUrl: z.string().url(),
  origin: z.enum(["DISCORD", "SEVENTV", "BTTV", "FFZ", "TWITCH", "CUSTOM"]),
  reference: z.string(),
});

export const savedEmotesRouter = createTRPCRouter({
  add: protectedProcedure
    .input(AddEmoteInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const { animated, emoteName, emoteUrl, origin, reference } = input;

      try {
        const user = await ctx.db.account.findFirst({ where: { userId: id } });
        if (!user) throw new Error("User not found");

        const savedEmoteExpireTime = 1000 * 60 * 60 * 24 * 7;
        const currentTime = new Date();

        await ctx.db.emotes.create({
          data: {
            animated,
            emoteName,
            emoteUrl,
            origin,
            reference,
            expiresOn: new Date(currentTime.getTime() + savedEmoteExpireTime),
            accountId: user.providerAccountId,
          },
        });

        return true;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        } else {
          throw "Uncaught error";
        }
      }
    }),
});
