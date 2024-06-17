'use client';

import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

type DeleteHistoryButtonProps = {
	id: string;
};

const DeleteHistoryButton: React.FunctionComponent<
	DeleteHistoryButtonProps
> = ({ id }): React.ReactNode => {
	const router = useRouter();

	const deletePrompt = api.prompt.deletePrompt.useMutation({
		onSuccess: () => {
			console.log('Prompt deleted');
			router.refresh();
		},
		onError: (error) => {
			console.error('Failed to deleted prompt:', error);
		},
	});

	return (
		<Button
			variant='ghost'
			size='icon'
			className='group'
			onClick={() => deletePrompt.mutate({ id })}>
			<Trash2 className='size-4 group-hover:stroke-red-600' />
		</Button>
	);
};

export default DeleteHistoryButton;
