import { type Metadata } from 'next/types';
import { api } from '@/trpc/server';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

import DeleteHistoryButton from './_components/delete-history-button';

export const metadata: Metadata = {
	title: 'History',
};

export default async function History() {
	const history = await api.prompt.getPrompts();

	return (
		<main className='flex w-full flex-1 flex-col items-center justify-between gap-4 p-4 sm:px-6 sm:py-0'>
			<div className='flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-32 py-6'>
				<ScrollArea className='h-[768px] w-full'>
					{history.map((prompt) => (
						<div key={prompt.id} className='mb-4'>
							<Card>
								<CardHeader>
									<CardTitle>
										<div className='flex w-full items-center justify-between'>
											{prompt.model} - {prompt.result}
											<DeleteHistoryButton
												id={prompt.id}
											/>
										</div>
									</CardTitle>
									<CardDescription>
										{prompt.createdAt.toLocaleDateString()}
									</CardDescription>
								</CardHeader>
								<CardContent>{prompt.prompt}</CardContent>
							</Card>
						</div>
					))}
				</ScrollArea>
			</div>
		</main>
	);
}
