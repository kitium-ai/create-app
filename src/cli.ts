#!/usr/bin/env node

/**
 * @kitiumai/create-app CLI
 * Interactive project scaffolding tool
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { createProject } from './generator.js';
import { promptForOptions } from './prompts.js';
import { getPackageInfo } from './utils.js';

const program = new Command();
const packageInfo = getPackageInfo();

program
  .name('create-kitium-app')
  .description('Create a new KitiumAI project')
  .version(packageInfo.version)
  .argument('[project-name]', 'Name of the project')
  .option('-t, --template <type>', 'Template type (typescript|react)')
  .option('-p, --package-manager <pm>', 'Package manager (npm|pnpm|yarn)')
  .option('--no-git', 'Skip git initialization')
  .option('--no-install', 'Skip dependency installation')
  .action(async (projectName, options) => {
    console.log(chalk.cyan.bold('\n✨ Welcome to KitiumAI Project Generator!\n'));

    try {
      // Get project options from prompts or CLI args
      const projectOptions = await promptForOptions(projectName, options);

      // Generate the project
      await createProject(projectOptions);

      console.log(chalk.green.bold('\n✅ Project created successfully!\n'));
      console.log(chalk.cyan('Next steps:'));
      console.log(chalk.gray(`  cd ${projectOptions.projectName}`));
      
      if (!projectOptions.install) {
        console.log(chalk.gray(`  ${projectOptions.packageManager} install`));
      }
      
      console.log(chalk.gray(`  ${projectOptions.packageManager} dev\n`));
    } catch (error) {
      console.error(chalk.red('\n❌ Error creating project:'), error);
      process.exit(1);
    }
  });

program.parse();
