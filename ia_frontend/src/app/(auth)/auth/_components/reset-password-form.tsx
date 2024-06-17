'use client';

import { APP_ROUTES } from '@/routes/app';
import { ResetPasswordSchema, type ResetPassword } from '@/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { Button, buttonVariants } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const ResetPasswordForm: React.FunctionComponent = (): React.ReactNode => {
	const form = useForm<ResetPassword>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (data: ResetPassword) => {
		// TODO: Sing In User
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				toast({
					title: 'You submitted the following values:',
					description: (
						<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
							<code className='text-white'>
								{JSON.stringify(data, null, 2)}
							</code>
						</pre>
					),
				});
				resolve();
			}, 5000);
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				name='reset-password-form'
				className='flex w-full flex-col gap-4'>
				<FormField
					control={form.control}
					name='password'
					disabled={form.formState.isSubmitting}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='********'
									autoComplete='new-password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='confirmPassword'
					disabled={form.formState.isSubmitting}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='********'
									autoComplete='new-password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='w-full'
					disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? (
						<Fragment>
							<Loader2 className='mr-2 size-4 animate-spin' />
							Submitting...
						</Fragment>
					) : (
						<Fragment>Submit</Fragment>
					)}
				</Button>
				<Link
					href={APP_ROUTES.AUTH.SIGN_IN}
					className={`w-full ${buttonVariants({
						variant: 'secondary',
					})}`}>
					Go Back
				</Link>
			</form>
		</Form>
	);
};

export default ResetPasswordForm;
