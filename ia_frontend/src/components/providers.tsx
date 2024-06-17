import { TRPCReactProvider } from '@/trpc/react';

import { SessionProvider } from './session-provider';
import ThemeProvider from './theme-provider';
import { Toaster } from './ui/toaster';

type ProvidersProps = {
	children: React.ReactNode;
};

const Providers: React.FunctionComponent<ProvidersProps> = ({
	children,
}): React.ReactNode => {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='dark'
			disableTransitionOnChange>
			<TRPCReactProvider>
				<SessionProvider>
					{children}
					<Toaster />
				</SessionProvider>
			</TRPCReactProvider>
		</ThemeProvider>
	);
};

export default Providers;
