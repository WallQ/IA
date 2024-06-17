'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { APP_ROUTES } from '@/routes/app';
import { SignInSchema, type SignIn } from '@/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Icons } from '@/components/icons';

const SignInForm: React.FunctionComponent = (): React.ReactNode => {
	const form = useForm<SignIn>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: '',
			password: '',
			remember: false,
		},
	});

	const onSubmit = (data: SignIn) => {
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
				name='sign-in-form'
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
									autoComplete='current-password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
					<FormField
						control={form.control}
						name='remember'
						render={({ field }) => (
							<FormItem className='flex flex-row gap-x-3 space-y-0'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										disabled={form.formState.isSubmitting}
									/>
								</FormControl>
								<FormLabel>Remember me</FormLabel>
							</FormItem>
						)}
					/>
					<Link
						href={APP_ROUTES.AUTH.FORGOT_PASSWORD}
						className='text-sm text-primary underline-offset-4 hover:underline'>
						Forgot your password?
					</Link>
				</div>
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
					href={APP_ROUTES.AUTH.SIGN_UP}
					className={`w-full ${buttonVariants({
						variant: 'secondary',
					})}`}>
					Create an account
				</Link>
				<div className='relative'>
					<div className='absolute inset-0 flex items-center'>
						<span className='w-full border-t' />
					</div>
					<div className='relative flex justify-center text-xs uppercase'>
						<span className='bg-background px-2 text-muted-foreground'>
							Or continue with
						</span>
					</div>
				</div>
				<Button
					type='button'
					variant='outline'
					className='w-full'
					onClick={() =>
						signIn('github', {
							redirect: true,
						})
					}>
					<Icons.github className='mr-2 size-4' />
					Continue with GitHub
				</Button>
			</form>
		</Form>
	);
};

export default SignInForm;
