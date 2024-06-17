import { env } from '@/env';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getBaseUrl() {
	if (env.NODE_ENV === 'development') {
		return 'http://localhost:3000';
	} else {
		return `https://${env.NEXTAUTH_URL}`;
	}
}

export const getInitials = (name: string): string => {
	return name
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase())
		.join('');
};
