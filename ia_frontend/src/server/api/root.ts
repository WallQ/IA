import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc';

import { promptRouter } from './routers/prompt';

export const appRouter = createTRPCRouter({
	prompt: promptRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
