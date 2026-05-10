import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';

const meta = {
	title: 'Molecules/DataTable',
	component: DataTable,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = [
	{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'active', createdAt: '2026-05-01' },
	{ id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'pending', createdAt: '2026-05-05' },
	{ id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'active', createdAt: '2026-05-10' },
	{ id: 4, name: 'David Wilson', email: 'david@example.com', status: 'inactive', createdAt: '2026-05-12' },
	{ id: 5, name: 'Eve Davis', email: 'eve@example.com', status: 'active', createdAt: '2026-05-15' },
	{ id: 6, name: 'Frank Miller', email: 'frank@example.com', status: 'pending', createdAt: '2026-05-20' },
];

const columns = [
	{ title: 'ID', fieldName: 'id', width: 60 },
	{ title: 'Name', fieldName: 'name' },
	{ title: 'Email', fieldName: 'email' },
	{ title: 'Status', fieldName: 'status' },
	{ title: 'Created At', fieldName: 'createdAt' },
];

const statusOptions = [
	{ label: 'Active', value: 'active' },
	{ label: 'Pending', value: 'pending' },
	{ label: 'Inactive', value: 'inactive' },
];

export const Default: Story = {
	args: {
		route: 'demo-table',
		columns: columns as any,
		data: mockData,
		statusOptions,
	},
	render: (args) => (
		<div className='space-y-4'>
			<div className='bg-blue-50 p-4 rounded-md border border-blue-200 mb-6'>
				<p className='text-blue-700 text-sm'>
					Try filtering the table by search, status, or date. Notice that a fingerprint (hash) is added to the URL. If you refresh the page
					(in a real app) or switch stories, the filters persist in sessionStorage.
				</p>
			</div>
			<DataTable {...args} />
		</div>
	),
};

export const InvoicesTable: Story = {
	args: {
		route: 'invoices',
		columns: columns as any,
		data: mockData,
		statusOptions,
	},
};

export const CustomersTable: Story = {
	args: {
		route: 'customers',
		columns: columns as any,
		data: mockData,
		statusOptions,
	},
};

export const Virtualized: Story = {
	args: {
		route: 'virtualized-table',
		columns: columns as any,
		data: Array.from({ length: 10000 }).map((_, i) => ({
			id: i + 1,
			name: `User ${i + 1}`,
			email: `user${i + 1}@example.com`,
			status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'pending' : 'inactive',
			createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
		})),
		statusOptions,
		virtualized: true,
		containerHeight: 500,
	},
	render: (args) => (
		<div className='space-y-4'>
			<div className='bg-purple-50 p-4 rounded-md border border-purple-200 mb-6'>
				<p className='text-purple-700 text-sm'>
					This table contains <strong>10,000 rows</strong>. It uses <code>@tanstack/react-virtual</code> to only render visible rows,
					ensuring smooth scrolling and high performance.
				</p>
			</div>
			<DataTable {...args} />
		</div>
	),
};
