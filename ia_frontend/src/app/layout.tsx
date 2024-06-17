import '@/styles/globals.css';

import { type Metadata, type Viewport } from 'next/types';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { config } from '@/config/app';
import { cn } from '@/lib/utils';
import Providers from '@/components/providers';

export const metadata: Metadata = {
	authors: [
		{
			name: 'Sérgio Félix',
			url: 'https://portfolio-wallq.vercel.app/',
		},
	],
	creator: 'Sérgio Félix',
	description: config.description,
	icons: [
		{ rel: 'icon', url: '/favicon.ico' },
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			url: '/apple-touch-icon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '192x192',
			url: '/android-chrome-192x192.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			url: '/favicon-16x16.png',
		},
		{
			rel: 'mask-icon',
			color: '#f97316',
			url: '/safari-pinned-tab.svg',
		},
	],
	keywords: [
		'nextjs',
		'typescript',
		'trpc',
		'drizzle',
		'next-auth',
		'tailwind-css',
		'shadcn/ui',
		'ai',
	],
	manifest: `${config.url}/site.webmanifest`,
	metadataBase: new URL(config.url),
	openGraph: {
		description: config.description,
		images: [
			{
				alt: config.name,
				height: 630,
				url: `${config.url}/og.png`,
				width: 1200,
			},
		],
		locale: 'pt_PT',
		siteName: config.name,
		title: config.name,
		type: 'website',
		url: config.url,
	},
	other: {
		'apple-mobile-web-app-title': `${config.name}`,
		'application-name': `${config.name}`,
		'msapplication-TileColor': '#ffffff',
		'msapplication-TileImage': '/mstile-144x144.png',
	},
	title: {
		default: config.name,
		template: `%s | ${config.name}`,
	},
	twitter: {
		card: 'summary_large_image',
		creator: '@sergiofelixdev',
		description: config.description,
		images: [
			{
				alt: config.name,
				height: 630,
				url: `${config.url}/og.png`,
				width: 1200,
			},
		],
		title: config.name,
	},
};

export const viewport: Viewport = {
	colorScheme: 'dark light',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn(GeistSans.variable, GeistMono.variable)}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
