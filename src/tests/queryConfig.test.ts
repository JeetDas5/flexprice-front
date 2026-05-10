import { describe, it, expect } from 'vitest';
import { createQueryConfig, QUERY_PRESETS } from '@/utils/queryConfig';

describe('createQueryConfig', () => {
	it('should return DEFAULT preset by default', () => {
		const config = createQueryConfig();
		expect(config.staleTime).toBe(QUERY_PRESETS.DEFAULT.staleTime);
		expect(config.gcTime).toBe(QUERY_PRESETS.DEFAULT.gcTime);
	});

	it('should allow overriding staleTime', () => {
		const config = createQueryConfig({ staleTime: 0 });
		expect(config.staleTime).toBe(0);
		expect(config.gcTime).toBe(QUERY_PRESETS.DEFAULT.gcTime);
	});

	it('should allow overriding gcTime', () => {
		const config = createQueryConfig({ gcTime: 1000 });
		expect(config.gcTime).toBe(1000);
		expect(config.staleTime).toBe(QUERY_PRESETS.DEFAULT.staleTime);
	});

	it('should support presets', () => {
		const realtimeConfig = createQueryConfig(QUERY_PRESETS.REALTIME);
		expect(realtimeConfig.staleTime).toBe(0);

		const staticConfig = createQueryConfig(QUERY_PRESETS.STATIC);
		expect(staticConfig.staleTime).toBe(30 * 60 * 1000);
	});

	it('should combine multiple overrides', () => {
		const config = createQueryConfig({ staleTime: 100, gcTime: 200 });
		expect(config.staleTime).toBe(100);
		expect(config.gcTime).toBe(200);
	});
});
