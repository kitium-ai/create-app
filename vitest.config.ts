import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/test-temp/**',
      '**/templates/**', // Exclude template files from tests
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/*.test.ts',
        '**/*.spec.ts',
        'dist/**',
        'node_modules/**',
        'test-temp/**',
        'templates/**', // Exclude template files from coverage
      ],
    },
  },
});

