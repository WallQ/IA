'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = ({
	children,
	...props
}): React.ReactNode => {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
