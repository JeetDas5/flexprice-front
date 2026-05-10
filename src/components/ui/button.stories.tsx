import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { Button } from './button';

const meta = {
	title: 'Atoms/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
			description: 'The visual style of the button',
		},
		size: {
			control: 'select',
			options: ['default', 'sm', 'lg', 'icon', 'xs'],
			description: 'The size of the button',
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the button is disabled',
		},
		onClick: { action: 'clicked' },
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Button',
		variant: 'default',
		size: 'default',
	},
};

export const Secondary: Story = {
	args: {
		children: 'Secondary',
		variant: 'secondary',
	},
};

export const Outline: Story = {
	args: {
		children: 'Outline',
		variant: 'outline',
	},
};

export const Destructive: Story = {
	args: {
		children: 'Destructive',
		variant: 'destructive',
	},
};

export const Ghost: Story = {
	args: {
		children: 'Ghost',
		variant: 'ghost',
	},
};

export const Link: Story = {
	args: {
		children: 'Link',
		variant: 'link',
	},
};

export const Small: Story = {
	args: {
		children: 'Small Button',
		size: 'sm',
	},
};

export const Large: Story = {
	args: {
		children: 'Large Button',
		size: 'lg',
	},
};

export const Icon: Story = {
	args: {
		children: '🚀',
		size: 'icon',
	},
};

export const Disabled: Story = {
	args: {
		children: 'Disabled',
		disabled: true,
	},
};

export const InteractionTest: Story = {
	args: {
		children: 'Click Me',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: /Click Me/i });

		await expect(button).toBeInTheDocument();

		// Simulate click
		await userEvent.click(button);
	},
};
