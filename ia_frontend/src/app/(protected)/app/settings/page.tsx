import { type Metadata } from 'next/types';

export const metadata: Metadata = {
	title: 'Settings',
};

export default function Settings() {
	return (
		<main className='flex w-full flex-1 flex-col items-center justify-between gap-4 p-4 sm:px-6 sm:py-0'></main>
	);
}
