# Contributing to AutoTranslate

Thank you for your interest in contributing to AutoTranslate!

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/autotranstalte.git
   cd autotranstalte
   ```
3. Install dependencies:
   ```bash
   bun install
   ```

## Project Structure

```
autotranstalte/
├── index.ts              # Main CLI entry point
├── providers/            # Translation provider implementations
│   └── ollama.ts        # Ollama provider
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project metadata and dependencies
```

## Adding a New Provider

1. Create a new file in `providers/` (e.g., `providers/openai.ts`)
2. Export an async function following this signature:
   ```typescript
   export async function setup[ProviderName](filePath: string) {
     // Implementation
   }
   ```
3. Register the provider in `index.ts` by adding a case to the `runProviderSetup` switch statement
4. Add the provider option to the select prompt in `main()`

## Code Style

- Use TypeScript with strict mode enabled
- Follow existing code formatting
- Use meaningful variable and function names
- Keep functions focused on a single responsibility

## Commit Messages

Write clear, concise commit messages:
- Use present tense ("Add feature" not "Added feature")
- Keep the first line under 50 characters
- Provide more detail in the body if needed

## Pull Request Process

1. Ensure your code follows the project style
2. Test your changes locally with `bun run index.ts`
3. Update documentation if you're changing functionality
4. Submit your pull request with a clear description of changes

## Reporting Issues

When reporting issues, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Your environment (OS, Bun version, Ollama version)

## Questions?

Feel free to open an issue for any questions about contributing.
