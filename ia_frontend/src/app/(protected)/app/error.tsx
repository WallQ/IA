'use client';

import Link from 'next/link';
import { APP_ROUTES } from '@/routes/app';
import { ArrowLeft } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

const Error: React.FunctionComponent<ErrorProps> = ({
	error,
	reset,
}): React.ReactNode => {
	return (
		<div>
			<h2>Something went wrong!</h2>
			{error.message ?? 'An unexpected error has occurred.'}
			<Link
				href={APP_ROUTES.HOME}
				className={`w-full ${buttonVariants({
					variant: 'outline',
				})}`}>
				<ArrowLeft className='mr-2 h-4 w-4' />
				Go back
			</Link>
			<Button variant='destructive' className='w-full' onClick={reset}>
				Try Again
			</Button>
		</div>
	);
};

export default Error;
