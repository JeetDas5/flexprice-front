import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { Switch } from './switch';

const meta = {
	title: 'Atoms/Switch',
	component: Switch,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean',
			description: 'Whether the switch is disabled',
		},
		checked: {
			control: 'boolean',
			description: 'Whether the switch is checked',
		},
	},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	render: (args) => (
		<div className='flex items-center space-x-2'>
			<Switch id='airplane-mode' {...args} />
			<label htmlFor='airplane-mode' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
				Airplane Mode
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
			<Switch id='airplane-mode-disabled' {...args} />
			<label
				htmlFor='airplane-mode-disabled'
				className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
				Airplane Mode
			</label>
		</div>
	),
};

export const InteractionTest: Story = {
	render: () => (
		<div className='flex items-center space-x-2'>
			<Switch id='test-switch' data-testid='switch-element' />
			<label htmlFor='test-switch' className='text-sm font-medium leading-none'>
				Toggle me
			</label>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const switchElement = canvas.getByTestId('switch-element');

		await expect(switchElement).toBeInTheDocument();

		// Toggle switch
		await userEvent.click(switchElement);
	},
};
