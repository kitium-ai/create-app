import { defineConfig } from 'vitest/config';
// @ts-expect-error - CommonJS module
import baseConfig from '@kitiumai/config/vitest.config.base.js';

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    environment: 'node',
    globals: true,
  },
});

