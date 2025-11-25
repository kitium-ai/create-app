import { describe, it, expect } from 'vitest';
import { promptForOptions, type ProjectOptions } from '../src/prompts.js';

describe('prompts', () => {
  describe('promptForOptions', () => {
    it('should use provided project name', async () => {
      const result = await promptForOptions('my-project', {
        template: 'typescript',
        packageManager: 'pnpm',
        git: true,
        install: true,
      });

      expect(result.projectName).toBe('my-project');
    });

    it('should use provided template', async () => {
      const result = await promptForOptions('test', {
        template: 'react',
        packageManager: 'npm',
        git: false,
        install: false,
      });

      expect(result.template).toBe('react');
    });

    it('should use provided package manager', async () => {
      const result = await promptForOptions('test', {
        template: 'typescript',
        packageManager: 'yarn',
        git: true,
        install: true,
      });

      expect(result.packageManager).toBe('yarn');
    });

    it('should use provided git option', async () => {
      const result = await promptForOptions('test', {
        template: 'typescript',
        packageManager: 'pnpm',
        git: false,
        install: true,
      });

      expect(result.git).toBe(false);
    });

    it('should use provided install option', async () => {
      const result = await promptForOptions('test', {
        template: 'typescript',
        packageManager: 'pnpm',
        git: true,
        install: false,
      });

      expect(result.install).toBe(false);
    });
  });
});

