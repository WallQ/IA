import { cn } from '@/lib/utils';

type OuterWrapperProps = {
	children: React.ReactNode;
	styles?: string;
};

const OuterWrapper: React.FunctionComponent<OuterWrapperProps> = ({
	children,
	styles = '',
}): React.ReactNode => {
	return (
		<div
			className={cn(
				`relative mx-auto h-full max-w-7xl px-8 py-4 ${styles}`,
			)}>
			{children}
		</div>
	);
};

export default OuterWrapper;
