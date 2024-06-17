'use client';

import { useState } from 'react';
import { useModelStore } from '@/stores/model';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn, getInitials } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import { models } from '../data/models';

const ModelSwitcher: React.FunctionComponent = (): React.ReactNode => {
	const [openPopover, setOpenPopover] = useState(false);

	const selectedModel = useModelStore((state) => state.selectedModel);
	const setModel = useModelStore((state) => state.setModel);

	return (
		<Popover open={openPopover} onOpenChange={setOpenPopover}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={openPopover}
					className='w-64 gap-x-2'>
					{selectedModel ? (
						<Avatar className='h-5 w-5'>
							<AvatarImage
								src={`https://source.boringavatars.com/beam/128/${selectedModel.name}?colors=fafafa,f4f4f5,e4e4e7,d4d4d8,a1a1aa,71717a,52525b,3f3f46,27272a,18181b,09090b`}
								alt='Company logo'
							/>
							<AvatarFallback>
								{getInitials(selectedModel.name)}
							</AvatarFallback>
						</Avatar>
					) : null}
					{selectedModel ? selectedModel.name : 'Select model...'}
					<ChevronsUpDown className='ml-auto size-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-64 p-0'>
				<Command>
					<CommandInput placeholder='Search company...' />
					<CommandList>
						<CommandEmpty>No company found.</CommandEmpty>
						{models && models.length > 0 ? (
							<CommandGroup>
								{models.map((model) => (
									<CommandItem
										key={model.value}
										value={model.value}
										onSelect={() => {
											setModel(model);
											setOpenPopover(false);
										}}>
										<Avatar className='mr-2 h-5 w-5'>
											<AvatarImage
												src={`https://source.boringavatars.com/beam/128/${model.name}?colors=fafafa,f4f4f5,e4e4e7,d4d4d8,a1a1aa,71717a,52525b,3f3f46,27272a,18181b,09090b`}
												alt={model.name}
											/>
											<AvatarFallback>
												{getInitials(model.name)}
											</AvatarFallback>
										</Avatar>
										{model.name}
										<Check
											className={cn(
												'ml-auto size-4',
												selectedModel?.value ===
													model.value
													? 'opacity-100'
													: 'opacity-0',
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						) : null}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default ModelSwitcher;
