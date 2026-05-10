import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card';

const meta = {
	title: 'Molecules/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Card className='w-[350px]'>
			<CardHeader>
				<CardTitle>Create project</CardTitle>
				<CardDescription>Deploy your new project in one-click.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex flex-col space-y-1.5'>
					<p className='text-sm text-muted-foreground'>This is the card content area. You can put any React components here.</p>
				</div>
			</CardContent>
			<CardFooter className='flex justify-between'>
				<button className='px-4 py-2 text-sm border rounded'>Cancel</button>
				<button className='px-4 py-2 text-sm bg-primary text-primary-foreground rounded'>Deploy</button>
			</CardFooter>
		</Card>
	),
};

export const Simple: Story = {
	render: () => (
		<Card className='p-6 w-[350px]'>
			<CardTitle className='mb-2'>Simple Card</CardTitle>
			<p className='text-sm text-muted-foreground'>Just a simple card without headers and footers.</p>
		</Card>
	),
};
