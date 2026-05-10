import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { Checkbox } from './checkbox';

const meta = {
	title: 'Atoms/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean',
			description: 'Whether the checkbox is disabled',
		},
		checked: {
			control: 'boolean',
			description: 'Whether the checkbox is checked',
		},
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	render: (args) => (
		<div className='flex items-center space-x-2'>
			<Checkbox id='terms' {...args} />
			<label htmlFor='terms' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
				Accept terms and conditions
			</label>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	render: (args) => (
		<div className='flex items-center space-x-2'>
			<Checkbox id='terms-disabled' {...args} />
			<label
				htmlFor='terms-disabled'
				className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
				Accept terms and conditions
			</label>
		</div>
	),
};

export const InteractionTest: Story = {
	render: () => (
		<div className='flex items-center space-x-2'>
			<Checkbox id='test-checkbox' data-testid='checkbox-element' />
			<label htmlFor='test-checkbox' className='text-sm font-medium leading-none'>
				Check me
			</label>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const checkboxElement = canvas.getByTestId('checkbox-element');

		await expect(checkboxElement).toBeInTheDocument();

		// Check it
		await userEvent.click(checkboxElement);
	},
};
