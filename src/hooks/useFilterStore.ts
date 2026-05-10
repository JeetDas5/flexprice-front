import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FilterState {
	filters: Record<string, Record<string, any>>;
	setFilter: (route: string, key: string, value: any) => void;
	resetFilters: (route: string) => void;
	getFilters: (route: string) => Record<string, any>;
}

/**
 * Creates a shallow fingerprint (hash) of the filter object.
 * This is used to sync with the URL without bloating it with large objects.
 */
const createFingerprint = (filters: Record<string, any>): string => {
	const str = JSON.stringify(filters);
	if (str === '{}') return '';

	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0; // Convert to 32bit integer
	}
	// Return a short base36 string
	return Math.abs(hash).toString(36);
};

/**
 * useFilterStore hook for persisting filter states across routes.
 * Uses sessionStorage for persistence and syncs a shallow fingerprint to the URL.
 */
export const useFilterStore = create<FilterState>()(
	persist(
		(set, get) => ({
			filters: {},

			setFilter: (route, key, value) => {
				set((state) => {
					const newRouteFilters = {
						...(state.filters[route] || {}),
						[key]: value,
					};

					// Remove null/undefined/empty string filters
					if (value === null || value === undefined || value === '') {
						delete newRouteFilters[key];
					}

					const newFilters = {
						...state.filters,
						[route]: newRouteFilters,
					};

					// Sync fingerprint to URL if we are in a browser
					if (typeof window !== 'undefined') {
						const fingerprint = createFingerprint(newRouteFilters);
						const url = new URL(window.location.href);
						if (fingerprint) {
							url.searchParams.set('f', fingerprint);
						} else {
							url.searchParams.delete('f');
						}
						window.history.replaceState({}, '', url.toString());
					}

					return { filters: newFilters };
				});
			},

			resetFilters: (route) => {
				set((state) => {
					const newFilters = {
						...state.filters,
						[route]: {},
					};

					// Clear fingerprint from URL
					if (typeof window !== 'undefined') {
						const url = new URL(window.location.href);
						url.searchParams.delete('f');
						window.history.replaceState({}, '', url.toString());
					}

					return { filters: newFilters };
				});
			},

			getFilters: (route) => {
				return get().filters[route] || {};
			},
		}),
		{
			name: 'flexprice-filters',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
