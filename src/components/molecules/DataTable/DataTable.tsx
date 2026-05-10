import { useMemo } from 'react';
import FlexpriceTable, { type ColumnData } from '../Table/Table';
import { useFilterStore } from '@/hooks/useFilterStore';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import DateRangePicker from '@/components/atoms/DateRangePicker/DateRangePicker';
import { Button } from '@/components/ui';
import { RotateCcw, Search } from 'lucide-react';

export interface DataTableProps<T> {
	route: string;
	columns: ColumnData<T>[];
	data: T[];
	statusOptions?: { label: string; value: string }[];
	virtualized?: boolean;
	containerHeight?: number;
}

/**
 * A feature-rich DataTable component wired up to useFilterStore.
 * It handles search, status filtering, and date range selection with persistence.
 */
export const DataTable = <T extends Record<string, any>>({
	route,
	columns,
	data,
	statusOptions,
	virtualized,
	containerHeight,
}: DataTableProps<T>) => {
	const { filters, setFilter, resetFilters } = useFilterStore();
	const activeFilters = filters[route] || {};

	const handleSearch = (value: string) => {
		setFilter(route, 'search', value);
	};

	const handleStatusChange = (value: string) => {
		setFilter(route, 'status', value === 'all' ? '' : value);
	};

	const handleDateChange = (dates: { startDate?: Date; endDate?: Date }) => {
		setFilter(route, 'dateRange', dates);
	};

	const handleReset = () => {
		resetFilters(route);
	};

	// Filter logic
	const filteredData = useMemo(() => {
		return data.filter((item) => {
			// Search filter (searches across all values for simplicity)
			if (activeFilters.search) {
				const searchLower = activeFilters.search.toLowerCase();
				const matchesSearch = Object.values(item).some((val) => String(val).toLowerCase().includes(searchLower));
				if (!matchesSearch) return false;
			}

			// Status filter
			if (activeFilters.status && item.status !== activeFilters.status) {
				return false;
			}

			// Date filter (assuming items have a 'createdAt' or 'date' field)
			if (activeFilters.dateRange?.startDate || activeFilters.dateRange?.endDate) {
				const itemDate = new Date(item.createdAt || item.date);
				if (activeFilters.dateRange.startDate && itemDate < activeFilters.dateRange.startDate) return false;
				if (activeFilters.dateRange.endDate && itemDate > activeFilters.dateRange.endDate) return false;
			}

			return true;
		});
	}, [data, activeFilters]);

	return (
		<div className='flex flex-col gap-4 w-full'>
			<div className='flex flex-wrap items-end gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm'>
				{/* Search Filter */}
				<div className='flex-1 min-w-[200px]'>
					<label className='text-xs font-medium text-gray-500 mb-1 block'>Search</label>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
						<Input
							placeholder='Search anything...'
							className='pl-9 h-10'
							value={activeFilters.search || ''}
							onChange={(e) => handleSearch(e.target.value)}
						/>
					</div>
				</div>

				{/* Status Filter */}
				{statusOptions && (
					<div className='w-[180px]'>
						<label className='text-xs font-medium text-gray-500 mb-1 block'>Status</label>
						<Select value={activeFilters.status || 'all'} onValueChange={handleStatusChange}>
							<SelectTrigger className='h-10'>
								<SelectValue placeholder='Filter by status' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All Statuses</SelectItem>
								{statusOptions.map((opt) => (
									<SelectItem key={opt.value} value={opt.value}>
										{opt.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				)}

				{/* Date Range Filter */}
				<div className='min-w-[260px]'>
					<DateRangePicker
						title='Date Range'
						startDate={activeFilters.dateRange?.startDate}
						endDate={activeFilters.dateRange?.endDate}
						onChange={handleDateChange}
					/>
				</div>

				{/* Reset Button */}
				<Button
					variant='ghost'
					size='icon'
					onClick={handleReset}
					className='h-10 w-10 text-gray-400 hover:text-gray-600'
					title='Reset Filters'>
					<RotateCcw className='h-4 w-4' />
				</Button>
			</div>

			<div className='bg-white rounded-lg'>
				<FlexpriceTable columns={columns} data={filteredData} showEmptyRow virtualized={virtualized} containerHeight={containerHeight} />
				<div className='mt-2 text-xs text-gray-500 text-right px-2'>
					Showing {filteredData.length} of {data.length} records
				</div>
			</div>
		</div>
	);
};
