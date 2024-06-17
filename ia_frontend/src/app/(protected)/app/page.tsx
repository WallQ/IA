import { type Metadata } from 'next/types';

import { Icons } from '@/components/icons';

import PromptInputForm from './_components/ui/prompt-input-form';
import PromptResult from './_components/ui/prompt-result';

export const metadata: Metadata = {
	title: 'App',
};

export default function Home() {
	return (
		<main className='flex w-full flex-1 flex-col items-center justify-between gap-4 p-4 sm:px-6 sm:py-0'>
			<div className='flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-32 py-6'>
				<Icons.logo className='size-24 stroke-white' />
				<PromptResult />
				<PromptInputForm />
			</div>
		</main>
	);
}
