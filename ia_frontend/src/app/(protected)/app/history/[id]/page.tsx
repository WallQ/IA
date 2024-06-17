import { type Metadata } from 'next/types';
import { api } from '@/trpc/server';

export const metadata: Metadata = {
	title: 'History',
};

type SelectedHistoryProps = {
	params: { id: string };
};

export default async function SelectedHistory({
	params,
}: SelectedHistoryProps) {
	const history = await api.prompt.getPrompts();

	return (
		<main className='flex w-full flex-1 flex-col items-start justify-between gap-4 p-4 sm:px-6 sm:py-0'>
			{history.map((prompt) => (
				<div key={prompt.id} className='flex flex-col gap-2'>
					<div className='flex flex-col gap-1'>
						<span className='text-lg font-bold'>
							{prompt.prompt}
						</span>
						<span className='text-sm'>{prompt.result}</span>
					</div>
					<div className='flex flex-col gap-1'>
						<span className='text-sm'>
							{prompt.createdAt.toLocaleDateString()}
						</span>
					</div>
				</div>
			))}
		</main>
	);
}
