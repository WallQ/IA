import { cn } from '@/lib/utils';

type InnerWrapperProps = {
	children: React.ReactNode;
	styles?: string;
};

const InnerWrapper: React.FunctionComponent<InnerWrapperProps> = ({
	children,
	styles = '',
}): React.ReactNode => {
	return (
		<div
			className={cn(
				`mx-auto flex h-full max-w-5xl flex-col items-center justify-center gap-12 py-12 md:py-24 lg:gap-24 lg:py-48 ${styles}`,
			)}>
			{children}
		</div>
	);
};

export default InnerWrapper;
