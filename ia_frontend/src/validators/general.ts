import { z } from 'zod';

export const minLengthErrorMessage = (type: string, number: number) =>
	`${type} must be at least ${number} characters long.`;
export const maxLengthErrorMessage = (type: string, number: number) =>
	`${type} cannot be longer than ${number} characters.`;

export const emailConstraints = () =>
	z
		.string()
		.trim()
		.email({ message: 'Provide a valid email address.' })
		.min(5, { message: minLengthErrorMessage('Email', 5) })
		.max(64, { message: maxLengthErrorMessage('Email', 64) });

export const passwordConstraints = () =>
	z
		.string()
		.trim()
		.min(8, { message: minLengthErrorMessage('Password', 8) })
		.max(16, { message: maxLengthErrorMessage('Password', 16) })
		.regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/, {
			message:
				'Password must contain at least one uppercase letter, one number, and one special character(!@#$%^&*).',
		});

export const firstNameConstraints = () =>
	z
		.string()
		.trim()
		.min(3, { message: minLengthErrorMessage('First name', 3) })
		.max(32, { message: maxLengthErrorMessage('First name', 32) });

export const lastNameConstraints = () =>
	z
		.string()
		.trim()
		.min(3, { message: minLengthErrorMessage('Last name', 3) })
		.max(32, { message: maxLengthErrorMessage('Last name', 32) });
