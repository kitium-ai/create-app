import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createProject } from '../src/generator.js';
import type { ProjectOptions } from '../src/prompts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, '..', 'test-temp');
const originalCwd = process.cwd();

describe('generator', () => {
  beforeEach(async () => {
    // Clean up test directory before each test
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir);
    }
    await fs.ensureDir(testDir);
    // Change to test directory
    process.chdir(testDir);
  });

  afterEach(async () => {
    // Restore original working directory
    process.chdir(originalCwd);
    // Clean up test directory after each test
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir);
    }
  });

  describe('createProject', () => {
    it('should create a TypeScript project', async () => {
      const options: ProjectOptions = {
        projectName: 'test-ts-project',
        template: 'typescript',
        packageManager: 'pnpm',
        git: false,
        install: false,
      };

      await createProject(options);
      
      const targetDir = path.join(testDir, options.projectName);

      // Check if project directory was created
      expect(await fs.pathExists(targetDir)).toBe(true);

      // Check if package.json exists
      const packageJsonPath = path.join(targetDir, 'package.json');
      expect(await fs.pathExists(packageJsonPath)).toBe(true);

      // Check if package.json has correct content
      const packageJson = await fs.readJSON(packageJsonPath);
      expect(packageJson.name).toBe('test-ts-project');
      expect(packageJson.dependencies).toHaveProperty('@kitiumai/utils-ts');

      // Check if src directory exists
      expect(await fs.pathExists(path.join(targetDir, 'src'))).toBe(true);

      // Check if tsconfig.json exists
      expect(await fs.pathExists(path.join(targetDir, 'tsconfig.json'))).toBe(true);
    });

    it('should create a React project', async () => {
      const options: ProjectOptions = {
        projectName: 'test-react-project',
        template: 'react',
        packageManager: 'pnpm',
        git: false,
        install: false,
      };

      await createProject(options);
      
      const targetDir = path.join(testDir, options.projectName);

      // Check if project directory was created
      expect(await fs.pathExists(targetDir)).toBe(true);

      // Check if package.json exists
      const packageJsonPath = path.join(targetDir, 'package.json');
      expect(await fs.pathExists(packageJsonPath)).toBe(true);

      // Check if package.json has correct content
      const packageJson = await fs.readJSON(packageJsonPath);
      expect(packageJson.name).toBe('test-react-project');
      expect(packageJson.dependencies).toHaveProperty('@kitiumai/utils-react');
      expect(packageJson.dependencies).toHaveProperty('react');

      // Check if src directory exists
      expect(await fs.pathExists(path.join(targetDir, 'src'))).toBe(true);

      // Check if vite.config.ts exists
      expect(await fs.pathExists(path.join(targetDir, 'vite.config.ts'))).toBe(true);
    });

    it('should replace template variables in files', async () => {
      const options: ProjectOptions = {
        projectName: 'my-awesome-project',
        template: 'typescript',
        packageManager: 'pnpm',
        git: false,
        install: false,
      };

      await createProject(options);
      
      const targetDir = path.join(testDir, options.projectName);

      // Check if PROJECT_NAME was replaced in package.json
      const packageJson = await fs.readJSON(path.join(targetDir, 'package.json'));
      expect(packageJson.name).toBe('my-awesome-project');
      expect(packageJson.name).not.toContain('{{PROJECT_NAME}}');

      // Check if PROJECT_NAME was replaced in source files
      const indexFile = await fs.readFile(
        path.join(targetDir, 'src', 'index.ts'),
        'utf-8'
      );
      expect(indexFile).not.toContain('{{PROJECT_NAME}}');
    });

    it('should throw error if directory already exists', async () => {
      const options: ProjectOptions = {
        projectName: 'existing-project',
        template: 'typescript',
        packageManager: 'pnpm',
        git: false,
        install: false,
      };

      const targetDir = path.join(testDir, options.projectName);
      await fs.ensureDir(targetDir);

      await expect(createProject(options)).rejects.toThrow('already exists');
    });

    it('should throw error if template does not exist', async () => {
      const options: ProjectOptions = {
        projectName: 'invalid-template',
        template: 'invalid' as 'typescript',
        packageManager: 'pnpm',
        git: false,
        install: false,
      };

      await expect(createProject(options)).rejects.toThrow('not found');
    });
  });
});

