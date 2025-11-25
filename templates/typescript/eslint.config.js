/**
 * ESLint configuration extending from @kitiumai/config
 */
import baseConfig from '@kitiumai/config/eslint.config.base.js';

export default [
  ...baseConfig,
  {
    ignores: ['dist', 'node_modules', 'coverage', '*.config.js'],
  },
];

