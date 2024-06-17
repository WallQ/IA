import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { history } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

export const promptRouter = createTRPCRouter({
	create: protectedProcedure
		.input(z.object({ prompt: z.string(), result: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.insert(history)
				.values({
					prompt: input.prompt,
					result: input.result,
					createdAt: new Date(),
					userId: ctx.session.user.id,
				})
				.onConflictDoNothing();
		}),
	getPrompts: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db
			.select()
			.from(history)
			.where(eq(history.userId, ctx.session.user.id));
	}),
	deletePrompt: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.delete(history)
				.where(
					and(
						eq(history.id, input.id),
						eq(history.userId, ctx.session.user.id),
					),
				);
		}),
});
