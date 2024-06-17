import { type Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { APP_ROUTES } from '@/routes/app';
import { getServerAuthSession } from '@/server/auth';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import ResetPasswordForm from '../_components/reset-password-form';

export const metadata: Metadata = {
	title: 'Reset Password',
};

export default async function ResetPassword() {
	const session = await getServerAuthSession();
	if (session) redirect(APP_ROUTES.HOME);

	return (
		<div className='flex flex-1 flex-col items-center justify-center'>
			<Card className='w-3/4'>
				<CardHeader>
					<CardTitle>Reset Password</CardTitle>
					<CardDescription>
						Enter your new password below.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ResetPasswordForm />
				</CardContent>
				<CardFooter>
					<p className='text-sm text-muted-foreground'>
						By continuing, you agree to our{' '}
						<Link href={APP_ROUTES.TERMS} className='underline'>
							Terms of Service
						</Link>{' '}
						and{' '}
						<Link href={APP_ROUTES.PRIVACY} className='underline'>
							Privacy Policy
						</Link>
						.
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
