import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

const meta = {
	title: 'Atoms/Tooltip',
	component: Tooltip,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<TooltipProvider>
				<Story />
			</TooltipProvider>
		),
	],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant='outline'>Hover me</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Add to library</p>
			</TooltipContent>
		</Tooltip>
	),
};

export const InteractionTest: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant='outline' data-testid='tooltip-trigger'>
					Hover me for details
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Some extra details</p>
			</TooltipContent>
		</Tooltip>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByTestId('tooltip-trigger');

		await expect(trigger).toBeInTheDocument();

		// Simulate hover
		await userEvent.hover(trigger);
	},
};
