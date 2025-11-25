# Contributing to @kitiumai/create-app

Thank you for your interest in contributing to `@kitiumai/create-app`! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/create-app.git`
3. Install dependencies: `pnpm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development

### Building

```bash
pnpm build
```

### Testing

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# With coverage
pnpm test:coverage
```

### Linting

```bash
# Check for issues
pnpm lint

# Auto-fix issues
pnpm lint:fix
```

## Adding New Templates

1. Create a new directory in `templates/` (e.g., `templates/nextjs/`)
2. Add all necessary template files
3. Use template variables:
   - `{{PROJECT_NAME}}` - Project name (kebab-case)
   - `{{PROJECT_NAME_PASCAL}}` - Project name (PascalCase)
   - `{{PROJECT_NAME_CAMEL}}` - Project name (camelCase)
4. Update `src/prompts.ts` to include the new template option
5. Add tests for the new template

## Code Style

- Use TypeScript with strict mode
- Follow ESLint rules (extends from @kitiumai/lint)
- Use Prettier for formatting
- Write JSDoc comments for public functions
- Keep functions small and focused

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## Pull Request Process

1. Ensure all tests pass: `pnpm test`
2. Ensure linting passes: `pnpm lint`
3. Update documentation if needed
4. Create a descriptive pull request
5. Reference any related issues

## Questions?

Feel free to open an issue for questions or discussions.

