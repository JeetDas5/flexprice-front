import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './select';

const meta = {
	title: 'Atoms/Select',
	component: Select,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean',
			description: 'Whether the select is disabled',
		},
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<Select {...args}>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Select a fruit' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Fruits</SelectLabel>
					<SelectItem value='apple'>Apple</SelectItem>
					<SelectItem value='banana'>Banana</SelectItem>
					<SelectItem value='blueberry'>Blueberry</SelectItem>
					<SelectItem value='grapes'>Grapes</SelectItem>
					<SelectItem value='pineapple'>Pineapple</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};

export const Disabled: Story = {
	render: () => (
		<Select disabled>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Select a fruit' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Fruits</SelectLabel>
					<SelectItem value='apple'>Apple</SelectItem>
					<SelectItem value='banana'>Banana</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};

export const InteractionTest: Story = {
	render: () => (
		<Select>
			<SelectTrigger className='w-[180px]' data-testid='select-trigger'>
				<SelectValue placeholder='Select a fruit' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Fruits</SelectLabel>
					<SelectItem value='apple'>Apple</SelectItem>
					<SelectItem value='banana'>Banana</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByTestId('select-trigger');

		await expect(trigger).toBeInTheDocument();

		// Open select
		await userEvent.click(trigger);
	},
};
