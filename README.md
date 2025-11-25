# @kitiumai/create-app

Interactive CLI tool for scaffolding KitiumAI projects with pre-configured templates.

## Usage

```bash
# With pnpm (recommended)
pnpm create @kitiumai/app

# With npm
npm create @kitiumai/app

# With yarn
yarn create @kitiumai/app
```

## Features

### 📦 TypeScript Template
- Vanilla TypeScript project
- Vitest for testing
- Pre-configured with KitiumAI packages:
  - `@kitiumai/logger`
  - `@kitiumai/types`
  - `@kitiumai/utils-ts`
  - `@kitiumai/config`
  - `@kitiumai/lint`
  - `@kitiumai/test-core`
  - `@kitiumai/vitest-helpers`

### ⚛️ React Template
- React + TypeScript + Vite
- Jest for testing
- Pre-configured with KitiumAI packages:
  - `@kitiumai/utils-react`
  - `@kitiumai/logger`
  - `@kitiumai/types`
  - `@kitiumai/config`
  - `@kitiumai/lint`
  - `@kitiumai/test-core`
  - `@kitiumai/jest-helpers`

### ▲ Next.js Template
- Next.js 14 + TypeScript + React
- App Router architecture
- Jest for testing
- Pre-configured with KitiumAI packages:
  - `@kitiumai/utils-react`
  - `@kitiumai/logger`
  - `@kitiumai/types`
  - `@kitiumai/config`
  - `@kitiumai/lint`
  - `@kitiumai/test-core`
  - `@kitiumai/jest-helpers`

### 🪶 NestJS Template
- NestJS + TypeScript
- RESTful API structure
- Vitest for testing
- Pre-configured with KitiumAI packages:
  - `@kitiumai/utils-ts`
  - `@kitiumai/logger`
  - `@kitiumai/types`
  - `@kitiumai/config`
  - `@kitiumai/lint`
  - `@kitiumai/test-core`
  - `@kitiumai/vitest-helpers`

## What It Does

1. **Interactive Prompts**: Choose project name, template, and package manager
2. **Template Copying**: Copies the selected template with variable replacement
3. **Git Initialization**: Optionally initializes git repository
4. **Dependency Installation**: Installs dependencies with chosen package manager
5. **Post-Install Configuration**: Runs `kitium-config` CLI to set up project

## CLI Options

```bash
create-kitium-app [project-name] [options]

Options:
  -t, --template <type>         Template type (typescript|react|nextjs|nestjs)
  -p, --package-manager <pm>    Package manager (npm|pnpm|yarn)
  --no-git                      Skip git initialization
  --no-install                  Skip dependency installation
  -h, --help                    Display help
  -V, --version                 Display version
```

## Examples

```bash
# Interactive mode
pnpm create @kitiumai/app

# With project name
pnpm create @kitiumai/app my-app

# With template
pnpm create @kitiumai/app my-app --template react

# Next.js template
pnpm create @kitiumai/app my-app --template nextjs

# NestJS template
pnpm create @kitiumai/app my-api --template nestjs

# Full non-interactive
pnpm create @kitiumai/app my-app --template typescript --package-manager pnpm
```

## Development

### Building

```bash
pnpm build
```

### Testing

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# With UI
pnpm test:ui

# Coverage
pnpm test:coverage
```

### Linting

```bash
# Check
pnpm lint

# Fix
pnpm lint:fix
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## License

MIT © KitiumAI
