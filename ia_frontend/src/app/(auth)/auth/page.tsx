import { redirect } from 'next/navigation';
import { type Metadata } from 'next/types';
import { APP_ROUTES } from '@/routes/app';

export const metadata: Metadata = {
	title: 'Authentication',
};

export default function Auth() {
	redirect(APP_ROUTES.AUTH.SIGN_IN);
}
