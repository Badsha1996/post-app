import { createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "~/server/api/routers/post";
import { profileRouter } from "./routers/profile";

export const appRouter = createTRPCRouter({
  post: postRouter,
  profile:profileRouter
});

export type AppRouter = typeof appRouter;
