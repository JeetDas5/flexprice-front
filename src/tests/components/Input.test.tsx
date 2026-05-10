import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/components/atoms/Input/Input';

describe('Input Component', () => {
	it('renders correctly with label and placeholder', () => {
		render(<Input label='Username' placeholder='Enter username' />);
		expect(screen.getByText('Username')).toBeDefined();
		expect(screen.getByPlaceholderText('Enter username')).toBeDefined();
	});

	it('calls onChange when value changes', () => {
		const handleChange = vi.fn();
		render(<Input onChange={handleChange} />);
		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'new value' } });
		expect(handleChange).toHaveBeenCalledWith('new value');
	});

	it('shows error message when error prop is provided', () => {
		render(<Input error='Invalid input' />);
		expect(screen.getByText('Invalid input')).toBeDefined();
	});

	it('is disabled when disabled prop is passed', () => {
		render(<Input disabled />);
		expect(screen.getByRole('textbox')).toBeDisabled();
	});

	it('renders prefix and suffix correctly', () => {
		render(<Input inputPrefix={<span data-testid='prefix'>$</span>} suffix={<span data-testid='suffix'>USD</span>} />);
		expect(screen.getByTestId('prefix')).toBeDefined();
		expect(screen.getByTestId('suffix')).toBeDefined();
	});
});
