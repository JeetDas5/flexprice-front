import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta = {
	title: 'Atoms/Badge',
	component: Badge,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'secondary', 'destructive', 'outline'],
			description: 'The visual style of the badge',
		},
		children: {
			control: 'text',
			description: 'The content inside the badge',
		},
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Active',
		variant: 'default',
	},
};

export const Secondary: Story = {
	args: {
		children: 'Draft',
		variant: 'secondary',
	},
};

export const Destructive: Story = {
	args: {
		children: 'Void',
		variant: 'destructive',
	},
};

export const Outline: Story = {
	args: {
		children: 'Archived',
		variant: 'outline',
	},
};
