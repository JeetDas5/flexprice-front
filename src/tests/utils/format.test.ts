import { describe, it, expect } from 'vitest';
import formatNumber, { formatCompactNumber } from '@/utils/common/format_number';
import { getBillingModelLabel } from '@/utils/common/price_helpers';
import { formatBillingPeriodDate } from '@/utils/common/format_date';
import { BILLING_MODEL } from '@/models/Price';

describe('Utility Functions', () => {
	describe('format_number utils', () => {
		it('formatNumber should format numbers with default decimals (0)', () => {
			expect(formatNumber(1234.567)).toBe('1,235');
			expect(formatNumber(1000)).toBe('1,000');
		});

		it('formatNumber should format numbers with specified decimals', () => {
			expect(formatNumber(1234.567, 2)).toBe('1,234.57');
			expect(formatNumber(1000, 2)).toBe('1,000.00');
		});

		it('formatNumber should return "-" for falsy values', () => {
			expect(formatNumber(0)).toBe('-');
		});

		it('formatCompactNumber should format large numbers with suffixes', () => {
			expect(formatCompactNumber(1000)).toBe('1k');
			expect(formatCompactNumber(1500)).toBe('1.5k');
			expect(formatCompactNumber(1000000)).toBe('1M');
			expect(formatCompactNumber(2500000)).toBe('2.5M');
			expect(formatCompactNumber(1000000000)).toBe('1B');
			expect(formatCompactNumber(500)).toBe('500');
		});
	});

	describe('price_helpers utils', () => {
		it('getBillingModelLabel should return correct labels', () => {
			expect(getBillingModelLabel(BILLING_MODEL.FLAT_FEE)).toBe('Flat Fee');
			expect(getBillingModelLabel(BILLING_MODEL.PACKAGE)).toBe('Package');
			expect(getBillingModelLabel(BILLING_MODEL.TIERED)).toBe('Volume Tiered');
			expect(getBillingModelLabel('SLAB_TIERED' as any)).toBe('Slab Tiered');
		});
	});

	describe('format_date utils', () => {
		it('formatBillingPeriodDate should format dates in UTC correctly', () => {
			const date = '2025-03-07T00:00:00Z';
			expect(formatBillingPeriodDate(date)).toBe('7 Mar');

			const date2 = '2025-12-31T23:59:59Z';
			expect(formatBillingPeriodDate(date2)).toBe('31 Dec');
		});

		it('formatBillingPeriodDate should return "Invalid Date" for invalid dates', () => {
			expect(formatBillingPeriodDate('invalid-date')).toBe('Invalid Date');
		});
	});
});
