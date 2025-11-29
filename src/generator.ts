import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import { execa } from 'execa';
import { camelCase, pascalCase } from '@kitiumai/utils-ts';

import type { ProjectOptions } from './prompts.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Create a new project from a template
 *
 * This function:
 * 1. Creates the project directory
 * 2. Copies template files with variable replacement
 * 3. Optionally initializes git repository
 * 4. Optionally installs dependencies
 * 5. Runs kitiumai-config for project setup
 *
 * @param options - Project creation options
 * @param options.projectName - Name of the project (will be used as directory name)
 * @param options.template - Template type ('typescript' | 'react')
 * @param options.packageManager - Package manager to use ('npm' | 'pnpm' | 'yarn')
 * @param options.git - Whether to initialize git repository
 * @param options.install - Whether to install dependencies
 * @throws {Error} If directory already exists or template not found
 *
 * @example
 * ```ts
 * await createProject({
 *   projectName: 'my-app',
 *   template: 'react',
 *   packageManager: 'pnpm',
 *   git: true,
 *   install: true,
 * });
 * ```
 */
export async function createProject(options: ProjectOptions): Promise<void> {
  const { projectName, template, packageManager, git, install } = options;

  // Resolve paths
  const targetDir = path.resolve(process.cwd(), projectName);
  const templateDir = path.resolve(__dirname, '..', 'templates', template);

  // Check if directory already exists
  if (await fs.pathExists(targetDir)) {
    throw new Error(`Directory ${projectName} already exists`);
  }

  // Check if template exists
  if (!(await fs.pathExists(templateDir))) {
    throw new Error(`Template ${template} not found`);
  }

  // Create project directory
  const spinner = ora(chalk.cyan('Creating project directory...')).start();
  await fs.ensureDir(targetDir);
  spinner.succeed(chalk.green('Project directory created'));

  // Copy template files
  spinner.start(chalk.cyan('Copying template files...'));
  await copyTemplate(templateDir, targetDir, projectName);
  spinner.succeed(chalk.green('Template files copied'));

  // Initialize git
  if (git) {
    spinner.start(chalk.cyan('Initializing git repository...'));
    try {
      await execa('git', ['init'], { cwd: targetDir });
      await execa('git', ['add', '.'], { cwd: targetDir });
      await execa('git', ['commit', '-m', 'Initial commit'], { cwd: targetDir });
      spinner.succeed(chalk.green('Git repository initialized'));
    } catch {
      spinner.warn(chalk.yellow('Git initialization failed (git may not be installed)'));
    }
  }

  // Install dependencies
  if (install) {
    spinner.start(chalk.cyan(`Installing dependencies with ${packageManager}...`));
    try {
      await execa(packageManager, ['install'], { cwd: targetDir });
      spinner.succeed(chalk.green('Dependencies installed'));

      // Run kitiumai-config
      spinner.start(chalk.cyan('Running kitiumai-config...'));
      try {
        await execa('npx', ['kitiumai-config', '--auto'], { cwd: targetDir });
        spinner.succeed(chalk.green('Project configured'));
      } catch {
        spinner.warn(chalk.yellow('kitiumai-config execution skipped (may not be available yet)'));
      }
    } catch (error) {
      spinner.fail(chalk.red('Dependency installation failed'));
      throw error;
    }
  }
}

/**
 * Copy template files and replace template variables
 *
 * Replaces the following variables in file contents:
 * - `{{PROJECT_NAME}}` - Project name in kebab-case
 * - `{{PROJECT_NAME_PASCAL}}` - Project name in PascalCase
 * - `{{PROJECT_NAME_CAMEL}}` - Project name in camelCase
 *
 * Also handles special case: copies `gitignore` file to `.gitignore`
 *
 * @param templateDir - Source template directory
 * @param targetDir - Target project directory
 * @param projectName - Project name for variable replacement
 * @internal
 */
async function copyTemplate(
  templateDir: string,
  targetDir: string,
  projectName: string
): Promise<void> {
  const files = await fs.readdir(templateDir);

  for (const file of files) {
    const srcPath = path.join(templateDir, file);
    const destPath = path.join(targetDir, file);
    const stat = await fs.stat(srcPath);

    if (stat.isDirectory()) {
      await fs.ensureDir(destPath);
      await copyTemplate(srcPath, destPath, projectName);
    } else {
      let content = await fs.readFile(srcPath, 'utf-8');

      // Replace template variables
      content = content
        .replace(/\{\{PROJECT_NAME\}\}/g, projectName)
        .replace(/\{\{PROJECT_NAME_PASCAL\}\}/g, pascalCase(projectName))
        .replace(/\{\{PROJECT_NAME_CAMEL\}\}/g, camelCase(projectName));

      await fs.writeFile(destPath, content);
    }
  }

  // Copy .gitignore (sometimes ignored by npm)
  const gitignoreSrc = path.join(templateDir, 'gitignore');
  const gitignoreDest = path.join(targetDir, '.gitignore');
  if (await fs.pathExists(gitignoreSrc)) {
    await fs.copy(gitignoreSrc, gitignoreDest);
  }
}
