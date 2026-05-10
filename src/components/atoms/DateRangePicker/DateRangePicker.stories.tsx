import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DateRangePicker from './DateRangePicker';

const meta = {
	title: 'Molecules/DateRangePicker',
	component: DateRangePicker,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'The title displayed above the picker',
		},
		placeholder: {
			control: 'text',
			description: 'The placeholder text when no dates are selected',
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the picker is disabled',
		},
	},
	args: {
		onChange: () => {},
	},
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const DateRangePickerWrapper = (args: any) => {
	const [dates, setDates] = useState<{ startDate?: Date; endDate?: Date }>({
		startDate: args.startDate,
		endDate: args.endDate,
	});

	return (
		<div className='w-[300px]'>
			<DateRangePicker {...args} startDate={dates.startDate} endDate={dates.endDate} onChange={setDates} />
		</div>
	);
};

export const Default: Story = {
	args: {
		startDate: new Date(1778524200000),
	},
	render: (args) => <DateRangePickerWrapper {...args} />,
};

export const WithTitle: Story = {
	args: {
		title: 'Select Billing Period',
	},
	render: (args) => <DateRangePickerWrapper {...args} />,
};

export const PreselectedRange: Story = {
	args: {},
	render: (args) => {
		const today = new Date();
		const nextWeek = new Date(today);
		nextWeek.setDate(today.getDate() + 7);

		return <DateRangePickerWrapper {...args} startDate={today} endDate={nextWeek} />;
	},
};
