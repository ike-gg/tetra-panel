import { createTRPCRouter } from "~/server/api/trpc";
import { bufferRouter } from "./routers/buffer";
import { tasksRouter } from "./routers/tasks";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  buffer: bufferRouter,
  tasks: tasksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
