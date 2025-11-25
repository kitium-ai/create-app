import enquirer from 'enquirer';
import chalk from 'chalk';

const { prompt } = enquirer;

export interface ProjectOptions {
  projectName: string;
  template: 'typescript' | 'react' | 'nextjs' | 'nestjs';
  packageManager: 'npm' | 'pnpm' | 'yarn';
  git: boolean;
  install: boolean;
}

/**
 * Prompt user for project options interactively
 *
 * If options are provided via CLI arguments, those are used.
 * Otherwise, prompts the user for missing information.
 *
 * @param projectName - Optional project name from CLI
 * @param cliOptions - Optional CLI options to use instead of prompting
 * @returns Complete project options object
 *
 * @example
 * ```ts
 * // Interactive mode
 * const options = await promptForOptions();
 *
 * // With CLI args
 * const options = await promptForOptions('my-app', {
 *   template: 'react',
 *   packageManager: 'pnpm',
 * });
 * ```
 */
export async function promptForOptions(
  projectName?: string,
  cliOptions: Partial<ProjectOptions> = {}
): Promise<ProjectOptions> {
  const questions: any[] = [];

  // Project name
  if (!projectName) {
    questions.push({
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      initial: 'my-kitium-app',
      validate: (value: string) => {
        if (!value || value.trim().length === 0) {
          return 'Project name is required';
        }
        if (!/^[a-z0-9-_]+$/.test(value)) {
          return 'Project name must contain only lowercase letters, numbers, hyphens, and underscores';
        }
        return true;
      },
    });
  }

  // Template selection
  if (!cliOptions.template) {
    questions.push({
      type: 'select',
      name: 'template',
      message: 'Select a template:',
      choices: [
        { name: 'typescript', message: '📦 TypeScript - Vanilla TypeScript project' },
        { name: 'react', message: '⚛️  React - React + TypeScript + Vite' },
        { name: 'nextjs', message: '▲ Next.js - Next.js + TypeScript + React' },
        { name: 'nestjs', message: '🪶 NestJS - NestJS + TypeScript API' },
      ],
    });
  }

  // Package manager
  if (!cliOptions.packageManager) {
    questions.push({
      type: 'select',
      name: 'packageManager',
      message: 'Select a package manager:',
      choices: ['pnpm', 'npm', 'yarn'],
      initial: 0,
    });
  }

  // Git initialization
  if (cliOptions.git === undefined) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize git repository?',
      initial: true,
    });
  }

  // Dependency installation
  if (cliOptions.install === undefined) {
    questions.push({
      type: 'confirm',
      name: 'install',
      message: 'Install dependencies?',
      initial: true,
    });
  }

  interface PromptAnswers {
    projectName?: string;
    template?: 'typescript' | 'react' | 'nextjs' | 'nestjs';
    packageManager?: 'npm' | 'pnpm' | 'yarn';
    git?: boolean;
    install?: boolean;
  }

  const answers = questions.length > 0 
    ? await prompt<PromptAnswers>(questions) 
    : {} as PromptAnswers;

  return {
    projectName: projectName || answers.projectName!,
    template: cliOptions.template || answers.template!,
    packageManager: cliOptions.packageManager || answers.packageManager!,
    git: cliOptions.git ?? answers.git ?? true,
    install: cliOptions.install ?? answers.install ?? true,
  };
}
