# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Added

- Initial release of `@kitiumai/create-app`
- TypeScript template with:
  - Vitest for testing
  - Full KitiumAI package integration
  - Proper TypeScript configuration
- React template with:
  - React + TypeScript + Vite
  - Jest for testing
  - Full KitiumAI package integration
- Next.js template with:
  - Next.js 14 + TypeScript + React
  - App Router architecture
  - Jest for testing
  - Full KitiumAI package integration
- NestJS template with:
  - NestJS + TypeScript
  - RESTful API structure
  - Vitest for testing
  - Full KitiumAI package integration
- Interactive CLI with prompts
- Template variable replacement system
- Git initialization support
- Automatic dependency installation
- Post-install configuration via `kitiumai-config`

### Fixed

- Fixed CLI command to use `kitiumai-config` directly
- Fixed Vitest configuration in TypeScript template
- Added Jest configuration to React template
- Fixed TypeScript syntax error in React template
- Added `.gitignore` to React template
- Updated dependency versions for standalone projects (not monorepo)

### Changed

- Updated all dependencies to use proper version ranges (`^1.0.0`, `^1.0.2`, etc.) instead of `workspace:*` for standalone projects
- TypeScript configs now extend from `@kitiumai/config/tsconfig.base.json`
- Test configs now extend from base configs
- Added comprehensive configuration files (`.editorconfig`, `prettier.config.cjs`, `eslint.config.js`)

### Documentation

- Comprehensive README with usage examples
- CONTRIBUTING.md for contributors
- CHANGELOG.md for version history

### Testing

- Added test suite for generator functions
- Added tests for prompts
- Added tests for utility functions
- Test coverage configuration

---

## [Unreleased]

### Planned

- More template options (Vue, Svelte, etc.)
- Template validation
- Better error messages
- Progress indicators
- Template customization options

