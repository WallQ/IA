import { APP_ROUTES } from '@/routes/app';
import { History, Home } from 'lucide-react';

export const navigationItems = [
	{
		title: 'Home',
		icon: Home,
		href: APP_ROUTES.APP.ROOT,
	},
	{
		title: 'History',
		icon: History,
		href: APP_ROUTES.APP.HISTORY,
	},
];
