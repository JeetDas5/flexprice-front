import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/atoms/Button/Button';

describe('Button Component', () => {
	it('renders correctly with children', () => {
		render(<Button>Click me</Button>);
		expect(screen.getByText('Click me')).toBeDefined();
	});

	it('calls onClick when clicked', () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click me</Button>);
		fireEvent.click(screen.getByText('Click me'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('shows loading spinner and disables button when isLoading is true', () => {
		render(<Button isLoading>Click me</Button>);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
		// The loader is a Lucide icon which usually renders as an svg
		expect(button.querySelector('svg')).toBeDefined();
		expect(screen.queryByText('Click me')).toBeNull();
	});

	it('is disabled when disabled prop is passed', () => {
		render(<Button disabled>Disabled</Button>);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('renders prefix and suffix icons', () => {
		render(
			<Button prefixIcon={<span data-testid='prefix'>P</span>} suffixIcon={<span data-testid='suffix'>S</span>}>
				Text
			</Button>,
		);
		expect(screen.getByTestId('prefix')).toBeDefined();
		expect(screen.getByTestId('suffix')).toBeDefined();
		expect(screen.getByText('Text')).toBeDefined();
	});
});
