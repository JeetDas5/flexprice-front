import type { Meta, StoryObj } from '@storybook/react';
import Dialog from './Dialog';
import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import { fn } from '@storybook/test';

const meta = {
	title: 'Atoms/Dialog',
	component: Dialog,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		isOpen: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const DialogWrapper = (args: any) => {
	const [isOpen, setIsOpen] = useState(args.isOpen);

	useEffect(() => {
		setIsOpen(args.isOpen);
	}, [args.isOpen]);

	return (
		<div className='flex items-center justify-center min-h-[200px]'>
			<Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
			<Dialog {...args} isOpen={isOpen} onOpenChange={setIsOpen} />
		</div>
	);
};

export const Default: Story = {
	args: {
		isOpen: false,
		title: 'Default Dialog',
		description: 'This is a default dialog description that explains the purpose of this modal.',
		children: (
			<div className='py-4'>
				<p className='text-sm text-gray-500'>This is the content area of the dialog. You can place any components or text here.</p>
			</div>
		),
		className: 'max-w-md',
		showCloseButton: true,
		onOpenChange: fn(),
	},
	render: (args) => <DialogWrapper {...args} />,
};

export const WithCustomContent: Story = {
	args: {
		isOpen: false,
		title: 'Success!',
		description: 'Your changes have been saved successfully.',
		children: (
			<div className='flex flex-col gap-4 py-4'>
				<div className='bg-green-50 p-4 rounded-md'>
					<p className='text-sm text-green-700'>The operation was completed without any errors. You can now proceed to the next step.</p>
				</div>
				<Button className='w-full' onClick={() => alert('Proceeding...')}>
					Continue
				</Button>
			</div>
		),
		className: 'max-w-sm',
		showCloseButton: true,
		onOpenChange: fn(),
	},
	render: (args) => <DialogWrapper {...args} />,
};
