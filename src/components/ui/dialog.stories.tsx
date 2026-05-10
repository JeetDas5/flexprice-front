import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { Button } from './button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';

const meta = {
	title: 'Organisms/Dialog',
	component: Dialog,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Edit Profile</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='flex items-center gap-4'>
						<label htmlFor='name' className='text-right w-1/4'>
							Name
						</label>
						<input id='name' defaultValue='Pedro Duarte' className='flex-1 border p-2 rounded' />
					</div>
					<div className='flex items-center gap-4'>
						<label htmlFor='username' className='text-right w-1/4'>
							Username
						</label>
						<input id='username' defaultValue='@peduarte' className='flex-1 border p-2 rounded' />
					</div>
				</div>
				<DialogFooter>
					<Button type='submit'>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};

export const InteractionTest: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' data-testid='dialog-trigger'>
					Open Dialog
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]' data-testid='dialog-content'>
				<DialogHeader>
					<DialogTitle>Test Dialog</DialogTitle>
					<DialogDescription>This is a test dialog for interaction testing.</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button type='button'>Close</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByTestId('dialog-trigger');

		await expect(trigger).toBeInTheDocument();

		// Open dialog
		await userEvent.click(trigger);
	},
};
