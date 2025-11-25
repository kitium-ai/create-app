import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Get package.json info from the current package
 *
 * @returns Object containing package version and name
 * @throws {Error} If package.json cannot be read
 *
 * @example
 * ```ts
 * const { version, name } = getPackageInfo();
 * console.log(`${name} v${version}`);
 * ```
 */
export function getPackageInfo(): { version: string; name: string } {
  const packagePath = path.resolve(__dirname, '..', 'package.json');
  const packageJson = fs.readJSONSync(packagePath);
  return {
    version: packageJson.version,
    name: packageJson.name,
  };
}

/**
 * Validate project name format
 *
 * Project names must:
 * - Contain only lowercase letters, numbers, hyphens, and underscores
 * - Not be empty
 *
 * @param name - Project name to validate
 * @returns True if the project name is valid, false otherwise
 *
 * @example
 * ```ts
 * isValidProjectName('my-project'); // true
 * isValidProjectName('My-Project'); // false (uppercase)
 * isValidProjectName('my project'); // false (spaces)
 * ```
 */
export function isValidProjectName(name: string): boolean {
  return /^[a-z0-9-_]+$/.test(name);
}
