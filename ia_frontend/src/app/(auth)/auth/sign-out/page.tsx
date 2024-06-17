'use client';

import { APP_ROUTES } from '@/routes/app';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function SignOut() {
	useEffect(() => {
		const singOutUser = async () => {
			await signOut({
				redirect: true,
				callbackUrl: APP_ROUTES.AUTH.SIGN_IN,
			});
		};

		singOutUser()
			.then(() => {
				console.log('User has signed out successfully!');
			})
			.catch((error) => {
				console.error('User has failed to sign out!', error);
			});
	}, []);

	return null;
}
