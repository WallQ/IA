import { type Metadata } from 'next';

import { Icons } from '@/components/icons';

export const metadata: Metadata = {
	title: 'Authentication | SIO',
};

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className='flex h-screen w-full flex-row'>
			<div className='hidden w-1/2 flex-col items-center justify-center bg-foreground lg:flex'>
				<Icons.logo className='size-1/4 stroke-secondary' />
			</div>
			{children}
		</main>
	);
}
