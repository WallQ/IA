'use client';

import { usePromptStore } from '@/stores/prompts';

const PromptResult: React.FunctionComponent = (): React.ReactNode => {
	const result = usePromptStore((state) => state.result);

	return (
		<p className='h-8 text-pretty text-base leading-7 text-white'>
			{result}
		</p>
	);
};

export default PromptResult;
