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

import ForgotPasswordForm from '../_components/forgot-password-form';

export const metadata: Metadata = {
	title: 'Forgot Password',
};

export default async function ForgotPassword() {
	const session = await getServerAuthSession();
	if (session) redirect(APP_ROUTES.HOME);

	return (
		<div className='flex flex-1 flex-col items-center justify-center'>
			<Card className='w-3/4'>
				<CardHeader>
					<CardTitle>Forgot Password</CardTitle>
					<CardDescription>
						Enter your email below to reset your password.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ForgotPasswordForm />
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
