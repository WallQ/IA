import { z } from 'zod';

import { maxLengthErrorMessage, minLengthErrorMessage } from './general';

export const PromptInputSchema = z.object({
	prompt: z
		.string()
		.trim()
		.min(3, { message: minLengthErrorMessage('Message', 3) })
		.max(512, { message: maxLengthErrorMessage('Message', 512) }),
});

export type PromptInput = z.infer<typeof PromptInputSchema>;
