'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DefaultAvatarImage from '@/assets/images/avatar.png';
import { APP_ROUTES } from '@/routes/app';
import { LogOut, PanelLeftIcon, Settings } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { cn, getInitials } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Icons } from '@/components/icons';

import { navigationItems } from '../data/navigation';
import ModelSwitcher from './model-switcher';

const Navbar: React.FunctionComponent = (): React.ReactNode => {
	const paths = usePathname();
	const pathNames = paths.split('/').filter((path) => path);

	const { data: session } = useSession();

	return (
		<header className='sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
			<div className='flex w-full items-center justify-between'>
				<div className='flex items-center justify-between gap-4'>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								className='sm:hidden'
								size='icon'
								variant='outline'>
								<PanelLeftIcon className='size-5' />
							</Button>
						</SheetTrigger>
						<SheetContent className='sm:max-w-xs' side='left'>
							<nav className='flex h-full flex-col gap-6 text-lg font-medium'>
								<Link
									className='group flex size-8 shrink-0 items-center justify-center gap-2 rounded-full bg-primary'
									href={APP_ROUTES.APP.ROOT}>
									<Icons.logo className='size-4 stroke-secondary transition-all group-hover:scale-110' />
								</Link>
								{navigationItems.map(
									({ href, title, icon: Icon }) => (
										<Link
											key={href}
											href={href}
											className={cn(
												'flex items-center gap-4 px-2.5 hover:text-foreground',
												{
													'text-foreground':
														href === paths,
													'text-muted-foreground':
														href !== paths,
												},
											)}>
											<Icon className='size-5' />
											{title}
										</Link>
									),
								)}
								<div className='mt-auto flex flex-col gap-6 text-lg font-medium'>
									<Link
										className={cn(
											'flex items-center gap-4 px-2.5 hover:text-foreground',
											{
												'text-foreground':
													APP_ROUTES.APP.SETTINGS ===
													paths,
												'text-muted-foreground':
													APP_ROUTES.APP.SETTINGS !==
													paths,
											},
										)}
										href={APP_ROUTES.APP.SETTINGS}>
										<Settings className='size-5' />
										Settings
									</Link>
								</div>
							</nav>
						</SheetContent>
					</Sheet>
					<div className='hidden sm:flex'>
						<ModelSwitcher />
					</div>
					<Breadcrumb className='flex'>
						<BreadcrumbList>
							{pathNames.map((path, index) => {
								const href = `/${pathNames.slice(0, index + 1).join('/')}`;
								const linkName =
									path[0]!.toUpperCase() +
									path.slice(1, path.length);
								const isLastPath =
									pathNames.length - 1 === index;
								return (
									<Fragment key={path}>
										<BreadcrumbItem>
											{!isLastPath ? (
												<BreadcrumbLink asChild>
													<Link href={href}>
														{linkName}
													</Link>
												</BreadcrumbLink>
											) : (
												<BreadcrumbPage>
													{linkName}
												</BreadcrumbPage>
											)}
										</BreadcrumbItem>
										{pathNames.length !== index + 1 && (
											<BreadcrumbSeparator />
										)}
									</Fragment>
								);
							})}
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className='flex items-center justify-between gap-4'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className='rounded-full'
								size='icon'
								variant='outline'>
								<Avatar>
									<AvatarImage
										src={
											session?.user.image ??
											DefaultAvatarImage.src
										}
										alt={
											session?.user.name ??
											'Anonymous User'
										}
									/>
									<AvatarFallback>
										{getInitials(
											session?.user.name ??
												'Anonymous User',
										)}
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<Link
										href={APP_ROUTES.APP.SETTINGS}
										className='flex w-full items-center'>
										<Settings className='mr-2 size-4' />
										Settings
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										href={APP_ROUTES.AUTH.SIGN_OUT}
										className='flex w-full items-center'>
										<LogOut className='mr-2 size-4' />
										Sign Out
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
