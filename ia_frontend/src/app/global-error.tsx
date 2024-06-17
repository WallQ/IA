'use client';

import { APP_ROUTES } from '@/routes/app';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button, buttonVariants } from '@/components/ui/button';

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className='mx-auto flex h-screen w-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
			<Alert variant='destructive'>
				<AlertCircle className='size-4' />
				<AlertTitle>Error!</AlertTitle>
				<AlertDescription>
					{error.message ?? 'An unexpected error has occurred.'}
				</AlertDescription>
				<div className='mt-4 flex w-full flex-row gap-x-2'>
					<Link
						href={APP_ROUTES.HOME}
						className={`w-full ${buttonVariants({
							variant: 'outline',
						})}`}>
						<ArrowLeft className='mr-2 size-4' />
						Go back
					</Link>
					<Button
						variant='destructive'
						className='w-full'
						onClick={reset}>
						Try Again
					</Button>
				</div>
			</Alert>
		</div>
	);
}