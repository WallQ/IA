import { z } from 'zod';

import {
	emailConstraints,
	firstNameConstraints,
	lastNameConstraints,
	passwordConstraints,
} from './general';

export const SignInSchema = z.object({
	email: emailConstraints(),
	password: passwordConstraints(),
	remember: z.boolean().optional(),
});

export type SignIn = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
	.object({
		firstName: firstNameConstraints(),
		lastName: lastNameConstraints(),
		email: emailConstraints(),
		password: passwordConstraints(),
		confirmPassword: passwordConstraints(),
		remember: z.boolean().optional(),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{
			message: 'Passwords must match each other.',
			path: ['confirmPassword'],
		},
	);

export type SignUp = z.infer<typeof SignUpSchema>;

export const ForgotPasswordSchema = z.object({
	email: emailConstraints(),
});

export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z
	.object({
		password: passwordConstraints(),
		confirmPassword: passwordConstraints(),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{
			message: 'Passwords must match each other.',
			path: ['confirmPassword'],
		},
	);

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
