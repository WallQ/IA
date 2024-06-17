import { cn } from '@/lib/utils';

type HeadingProps = {
	children: React.ReactNode;
	styles?: string;
	level: number;
};

export const Heading: React.FunctionComponent<HeadingProps> = ({
	children,
	styles = '',
	level,
}): React.ReactNode => {
	const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

	let textStyle = '';
	let fontWeight = '';

	switch (level) {
		case 1:
			textStyle = 'text-5xl lg:text-6xl';
			fontWeight = 'font-extrabold';
			break;
		case 2:
			textStyle = 'text-3xl lg:text-4xl';
			fontWeight = 'font-bold';
			break;
		case 3:
			textStyle = 'text-2xl';
			fontWeight = 'font-semibold';
			break;
		case 4:
			textStyle = 'text-xl';
			fontWeight = 'font-medium';
			break;
		default:
			textStyle = 'text-base';
			fontWeight = 'font-normal';
			break;
	}

	return (
		<HeadingTag
			className={cn(
				`bg-gradient-to-r from-primary/50 via-primary to-primary/50 bg-clip-text capitalize tracking-tight text-transparent ${textStyle} ${fontWeight} ${styles}`,
			)}>
			{children}
		</HeadingTag>
	);
};

type ParagraphProps = {
	children: React.ReactNode;
	styles?: string;
};

export const Paragraph: React.FunctionComponent<ParagraphProps> = ({
	children,
	styles = '',
}): React.ReactNode => {
	return (
		<p
			className={cn(
				`text-pretty text-lg leading-7 text-muted-foreground ${styles}`,
			)}>
			{children}
		</p>
	);
};

type SpanProps = {
	children: React.ReactNode;
	styles?: string;
};

export const Span: React.FunctionComponent<SpanProps> = ({
	children,
	styles = '',
}): React.ReactNode => {
	return (
		<span
			className={cn(
				`bg-gradient-to-r from-primary/50 via-primary to-primary/50 bg-clip-text text-base font-normal uppercase tracking-widest text-transparent ${styles}`,
			)}>
			{children}
		</span>
	);
};