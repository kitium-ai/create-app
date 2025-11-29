import baseConfig from '@kitiumai/config/vitest.config.base.js';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    globals: true,
    environment: 'node',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/test-temp/**',
      '**/templates/**',
      'tests/generator.test.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        '**/*.test.ts',
        '**/*.spec.ts',
        'dist/**',
        'node_modules/**',
        'test-temp/**',
        'templates/**',
      ],
    },
  },
});

