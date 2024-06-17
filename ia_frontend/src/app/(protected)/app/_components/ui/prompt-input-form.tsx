'use client';

import { useModelStore } from '@/stores/model';
import { usePromptStore } from '@/stores/prompts';
import { api } from '@/trpc/react';
import { PromptInputSchema, type PromptInput } from '@/validators/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const PromptInputForm: React.FunctionComponent = (): React.ReactNode => {
	const selectedModel = useModelStore((state) => state.selectedModel);
	const setResult = usePromptStore((state) => state.setResult);

	const createPrompt = api.prompt.create.useMutation({
		onSuccess: () => {
			console.log('Prompt created');
		},
		onError: (error) => {
			console.error('Failed to create prompt:', error);
		},
	});

	const form = useForm<PromptInput>({
		resolver: zodResolver(PromptInputSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const onSubmit = async (data: PromptInput) => {
		try {
			const response = await fetch('http://127.0.0.1:5000/predict', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: selectedModel?.value,
					prompt: data.prompt,
				}),
			});

			if (!response.ok) {
				throw new Error(`Server error: ${response.statusText}`);
			}

			const result = (await response.json()) as { spam: boolean };

			createPrompt.mutate({
				prompt: data.prompt,
				result: result.spam ? 'Spam' : 'Non-spam',
				model: selectedModel?.name ?? 'Unknown',
			});

			setResult(
				result.spam
					? 'The message you entered is likely spam.'
					: ' The message you entered is likely not spam.',
			);

			form.reset();
		} catch (error) {
			console.error('Error: ', error);

			if (error instanceof SyntaxError) {
				console.error('Failed to parse JSON response');
			} else {
				console.error('Network or server error');
			}
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				name='forgot-password-form'
				className='flex w-full flex-col gap-4'>
				<FormField
					control={form.control}
					name='prompt'
					disabled={form.formState.isSubmitting}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Message</FormLabel>
							<FormControl>
								<Textarea
									className='resize-none'
									placeholder='Your message here...'
									maxLength={512}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='w-full'
					disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? (
						<Fragment>
							<Loader2 className='mr-2 size-4 animate-spin' />
							Submitting...
						</Fragment>
					) : (
						<Fragment>Submit</Fragment>
					)}
				</Button>
			</form>
		</Form>
	);
};

export default PromptInputForm;
