import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta = {
	title: 'Atoms/Spinner',
	component: Spinner,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'number',
			description: 'The width and height of the spinner in pixels',
		},
		className: {
			control: 'text',
			description: 'Additional CSS classes',
		},
	},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		size: 24,
	},
};

export const Small: Story = {
	args: {
		size: 16,
	},
};

export const Large: Story = {
	args: {
		size: 48,
		className: 'text-primary',
	},
};

export const CustomColor: Story = {
	args: {
		size: 32,
		className: 'text-destructive',
	},
};
