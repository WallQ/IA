import { APP_ROUTES } from '@/routes/app';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { Icons } from '@/components/icons';
import InnerWrapper from '@/components/inner-wrapper';
import OuterWrapper from '@/components/outer-wrapper';
import { Heading, Paragraph } from '@/components/typography';

export default function NotFound() {
	return (
		<main>
			<OuterWrapper styles='h-screen'>
				<InnerWrapper styles='lg:gap-12'>
					<Icons.logo className='size-1/4 stroke-primary' />
					<Heading level={1} styles='text-center normal-case'>
						<Balancer>
							Oops! A tornado flew around and took the page you
							were looking for...
						</Balancer>
					</Heading>
					<Paragraph styles='text-center'>
						<Balancer>
							But don&apos;t worry, you can find plenty of other
							interesting stuff on other pages.
						</Balancer>
					</Paragraph>
					<Link
						href={APP_ROUTES.HOME}
						className='inline-flex h-10 animate-shine items-center justify-center whitespace-nowrap rounded-md bg-gradient-to-r from-primary via-primary/75 to-primary bg-[length:400%_100%] px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
						<ArrowLeft className='mr-2 size-4' />
						Go back
					</Link>
				</InnerWrapper>
			</OuterWrapper>
		</main>
	);
}