'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { APP_ROUTES } from '@/routes/app';
import { ForgotPasswordSchema, type ForgotPassword } from '@/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
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

const ForgotPasswordForm: React.FunctionComponent = (): React.ReactNode => {
	const form = useForm<ForgotPassword>({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = (data: ForgotPassword) => {
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
				name='forgot-password-form'
				className='flex w-full flex-col gap-4'>
				<FormField
					control={form.control}
					name='email'
					disabled={form.formState.isSubmitting}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type='email'
									placeholder='ia@estg.ipp.pt'
									autoComplete='email'
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

export default ForgotPasswordForm;
