export const QUERY_PRESETS = {
	/** For real-time data that should never be stale */
	REALTIME: {
		staleTime: 0,
		gcTime: 5 * 60 * 1000, // 5 minutes
	},
	/** Standard default caching strategy */
	DEFAULT: {
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	},
	/** For data that rarely changes  */
	STATIC: {
		staleTime: 30 * 60 * 1000, // 30 minutes
		gcTime: 60 * 60 * 1000, // 1 hour
	},
} as const;

export interface QueryConfigOverrides {
	staleTime?: number;
	gcTime?: number;
}

export function createQueryConfig(overrides: QueryConfigOverrides = {}): QueryConfigOverrides {
	return {
		...QUERY_PRESETS.DEFAULT,
		...overrides,
	};
}
