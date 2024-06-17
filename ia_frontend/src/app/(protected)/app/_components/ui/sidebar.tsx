'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { APP_ROUTES } from '@/routes/app';
import { SettingsIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from '@/components/icons';

import { navigationItems } from '../data/navigation';

const Sidebar: React.FunctionComponent = (): React.ReactNode => {
	const paths = usePathname();

	return (
		<aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
			<nav className='flex flex-col items-center gap-4 px-2 py-5'>
				<TooltipProvider>
					<Link
						className='group flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary p-2'
						href={APP_ROUTES.APP.ROOT}>
						<Icons.logo className='size-4 stroke-secondary transition-all group-hover:scale-110' />
					</Link>
					{navigationItems.map(({ href, title, icon: Icon }) => (
						<Tooltip key={href}>
							<TooltipTrigger asChild>
								<Link
									className={cn(
										'flex size-8 items-center justify-center transition-colors hover:text-foreground',
										{
											'text-foreground': href === paths,
											'text-muted-foreground':
												href !== paths,
										},
									)}
									href={href}>
									<Icon className='size-5' />
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>
								{title}
							</TooltipContent>
						</Tooltip>
					))}
				</TooltipProvider>
			</nav>
			<nav className='mt-auto flex flex-col items-center gap-4 px-2 py-5'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								className={cn(
									'flex size-8 items-center justify-center transition-colors hover:text-foreground',
									{
										'text-foreground':
											APP_ROUTES.APP.SETTINGS === paths,
										'text-muted-foreground':
											APP_ROUTES.APP.SETTINGS !== paths,
									},
								)}
								href={APP_ROUTES.APP.SETTINGS}>
								<SettingsIcon className='size-5' />
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Settings</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</nav>
		</aside>
	);
};

export default Sidebar;
