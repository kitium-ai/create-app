import { defineConfig } from 'vitest/config';
// @ts-expect-error - CommonJS module
import baseConfig from '@kitiumai/config/vitest.config.base.js';

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    // Add any project-specific test config here
  },
});
