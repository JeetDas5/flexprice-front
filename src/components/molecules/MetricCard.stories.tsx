import type { Meta, StoryObj } from '@storybook/react';
import MetricCard from './MetricCard';

const meta = {
	title: 'Molecules/MetricCard',
	component: MetricCard,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'The title of the metric card',
		},
		value: {
			control: 'number',
			description: 'The numerical value to display',
		},
		currency: {
			control: 'text',
			description: 'The currency code (e.g. USD, EUR) to display as a prefix',
		},
		isPercent: {
			control: 'boolean',
			description: 'If true, appends a % sign to the value',
		},
		showChangeIndicator: {
			control: 'boolean',
			description: 'If true, shows a trend arrow icon',
		},
		isNegative: {
			control: 'boolean',
			description: 'If true, makes the trend arrow red and pointing down',
		},
	},
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Total Users',
		value: 12450,
	},
};

export const Currency: Story = {
	args: {
		title: 'Monthly Revenue',
		value: 45231.89,
		currency: 'USD',
	},
};

export const PercentageUp: Story = {
	args: {
		title: 'Conversion Rate',
		value: 12.4,
		isPercent: true,
		showChangeIndicator: true,
		isNegative: false,
	},
};

export const PercentageDown: Story = {
	args: {
		title: 'Churn Rate',
		value: 3.2,
		isPercent: true,
		showChangeIndicator: true,
		isNegative: true,
	},
};
