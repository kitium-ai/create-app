/**
 * @kitiumai/create-app - Public API exports
 *
 * This package can be used both as a CLI tool and as a programmatic library
 */

export { createProject } from './generator.js';
export { promptForOptions } from './prompts.js';
export { getPackageInfo } from './utils.js';
export type { ProjectOptions } from './prompts.js';
