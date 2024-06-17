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

import SignInForm from '../_components/sign-in-form';

export const metadata: Metadata = {
	title: 'Sign In',
};

export default async function SignIn() {
	const session = await getServerAuthSession();
	if (session) redirect(APP_ROUTES.HOME);

	return (
		<div className='flex flex-1 flex-col items-center justify-center'>
			<Card className='w-3/4'>
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
					<CardDescription>
						Enter below the credentials to enter into your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<SignInForm />
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
