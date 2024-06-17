import { redirect } from 'next/navigation';
import { type Metadata } from 'next/types';
import { env } from '@/env';
import { APP_ROUTES } from '@/routes/app';
import Balancer from 'react-wrap-balancer';

import { Icons } from '@/components/icons';
import InnerWrapper from '@/components/inner-wrapper';
import OuterWrapper from '@/components/outer-wrapper';
import { Heading, Paragraph } from '@/components/typography';

export const metadata: Metadata = {
	title: 'Maintenance',
};

export default function Maintenance() {
	if (env.MAINTENANCE_MODE === 'false') redirect(APP_ROUTES.HOME);
	return (
		<main>
			<OuterWrapper styles='h-screen'>
				<InnerWrapper styles='lg:gap-12'>
					<Icons.logo className='size-1/4 stroke-primary' />
					<Heading level={1} styles='text-center normal-case'>
						<Balancer>
							Oops! We are still building the pages the tornado
							took away...
						</Balancer>
					</Heading>
					<Paragraph styles='text-center'>
						<Balancer>
							We are currently under maintenance. Please come back
							later. We apologize for any inconvenience this may
							cause you.
						</Balancer>
					</Paragraph>
				</InnerWrapper>
			</OuterWrapper>
		</main>
	);
}
